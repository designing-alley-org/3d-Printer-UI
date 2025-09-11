import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Slider,
  Grid,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Calculate as CalculateIcon,
  FilePresent as FileTextIcon,
  Straighten as WeightIcon,
  ZoomOutMap as MaximizeIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

// Types
interface Results {
  triangleCount: number;
  volumeCm3: number;
  volumeMm3: number;
  volumeIn3: number;
  massGrams: number;
  massKg: number;
  massPounds: number;
  density: number;
  scale: number;
}

interface MaterialOption {
  name: string;
  density: number;
}

const STLWeightCalculator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [density, setDensity] = useState<string>("");
  const [scale, setScale] = useState<string>("1");
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [processedTriangles, setProcessedTriangles] = useState<number[][][]>([]);

  const commonMaterials: MaterialOption[] = [
    { name: "PLA", density: 1.24 },
    { name: "ABS", density: 1.04 },
    { name: "PETG", density: 1.27 },
    { name: "TPU", density: 1.2 },
    { name: "Aluminum", density: 2.7 },
    { name: "Steel", density: 7.85 },
    { name: "Titanium", density: 4.43 },
    { name: "Copper", density: 8.96 },
    { name: "Brass", density: 8.5 },
    { name: "Resin (Standard)", density: 1.15 },
  ];

  // --- Math + Parsing Functions (same as your original code) ---
  const calculateTriangleVolume = (v0: number[], v1: number[], v2: number[]): number => {
    const cross = [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0],
    ];
    const dot = v0[0] * cross[0] + v0[1] * cross[1] + v0[2] * cross[2];
    return dot / 6.0;
  };

  const parseASCIISTL = (content: string): number[][][] => {
    const lines = content.split("\n");
    const triangles: number[][][] = [];
    let currentTriangle: number[][] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("vertex")) {
        const coords = trimmed.split(/\s+/).slice(1).map(Number);
        if (coords.length === 3 && coords.every((n) => !isNaN(n))) {
          currentTriangle.push(coords);
          if (currentTriangle.length === 3) {
            triangles.push([...currentTriangle]);
            currentTriangle = [];
          }
        }
      }
    }
    return triangles;
  };

  const parseBinarySTL = (buffer: ArrayBuffer): number[][][] => {
    const view = new DataView(buffer);
    const triangleCount = view.getUint32(80, true);
    const triangles: number[][][] = [];
    let offset = 84;
    for (let i = 0; i < triangleCount; i++) {
      offset += 12; // skip normal
      const triangle: number[][] = [];
      for (let j = 0; j < 3; j++) {
        const vertex = [
          view.getFloat32(offset, true),
          view.getFloat32(offset + 4, true),
          view.getFloat32(offset + 8, true),
        ];
        triangle.push(vertex);
        offset += 12;
      }
      triangles.push(triangle);
      offset += 2;
    }
    return triangles;
  };

  const calculateTotalVolume = (triangles: number[][][]): number => {
    return Math.abs(
      triangles.reduce((sum, tri) => sum + calculateTriangleVolume(tri[0], tri[1], tri[2]), 0)
    );
  };

  const processSTLFile = useCallback(
    async (fileToProcess: File) => {
      setLoading(true);
      setError("");

      const densityValue = parseFloat(density);
      const scaleFactor = parseFloat(scale) || 1.0;

      if (!densityValue || densityValue <= 0) {
        setError("Please provide a valid, positive material density.");
        setLoading(false);
        return;
      }

      try {
        const buffer = await fileToProcess.arrayBuffer();
        let triangles: number[][][] = [];
        const header = new TextDecoder().decode(buffer.slice(0, 80));
        const contentSample = new TextDecoder().decode(buffer);

        if (header.trim().toLowerCase().startsWith("solid") && contentSample.includes("endsolid")) {
          triangles = parseASCIISTL(contentSample);
        }

        if (triangles.length === 0) triangles = parseBinarySTL(buffer);

        if (triangles.length === 0) throw new Error("No valid triangles found.");

        const scaledTriangles =
          scaleFactor === 1.0
            ? triangles
            : triangles.map((tri) => tri.map((v) => v.map((c) => c * scaleFactor)));

        setProcessedTriangles(scaledTriangles);

        console.log({ triangles });
        console.log({ scaledTriangles });
                 

        const volumeMm3 = calculateTotalVolume(scaledTriangles);
        const volumeCm3 = volumeMm3 / 1000.0;
        const volumeIn3 = volumeCm3 * 0.0610237;
        const massGrams = volumeCm3 * densityValue;

        console.log({ massGrams });

        setResults({
          triangleCount: triangles.length,
          volumeCm3,
          volumeMm3,
          volumeIn3,
          massGrams,
          massKg: massGrams / 1000,
          massPounds: massGrams * 0.00220462,
          density: densityValue,
          scale: scaleFactor,
        });
      } catch (err: any) {
        setError(`Error processing STL file: ${err.message}`);
        setResults(null);
        setProcessedTriangles([]);
      } finally {
        setLoading(false);
      }
    },
    [density, scale]
  );

  useEffect(() => {
    if (file && density && parseFloat(density) > 0 && scale && parseFloat(scale) > 0) {
      processSTLFile(file);
    }
  }, [file, density, scale, processSTLFile]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.name.toLowerCase().endsWith(".stl")) {
        setFile(uploadedFile);
        setResults(null);
        setProcessedTriangles([]);
        setError("");
      } else {
        setError("Please upload a valid .stl file.");
        setFile(null);
      }
    }
  };

  const handleCalculate = () => {
    if (!file) return setError("Please upload an STL file first.");
    if (!density || parseFloat(density) <= 0) return setError("Enter a valid density.");
    if (!scale || parseFloat(scale) <= 0) return setError("Enter a valid scale factor.");
    processSTLFile(file);
  };

  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
        Precision STL Weight Calculator
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Calculate mass from 3D STL files with scaling and material selection.
      </Typography>

      <Grid container spacing={3} mt={2}>
        {/* Upload */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title={<><UploadIcon fontSize="small" /> Upload File</>} />
            <CardContent>
              <Button component="label" variant="outlined" fullWidth>
                Choose STL File
                <input type="file" hidden accept=".stl" onChange={handleFileUpload} />
              </Button>
              {file && (
                <Chip icon={<FileTextIcon />} label={file.name} sx={{ mt: 2 }} />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Scale */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title={<><MaximizeIcon fontSize="small" /> Set Scale</>} />
            <CardContent>
              <Slider
                value={parseFloat(scale)}
                min={0.1}
                max={3}
                step={0.01}
                onChange={(_, v) => setScale(String(v))}
              />
              <Typography align="center" mt={1}>
                {(parseFloat(scale || "1") * 100).toFixed(0)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Density */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title={<><CalculateIcon fontSize="small" /> Material Density</>} />
            <CardContent>
              <TextField
                type="number"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                placeholder="g/cm³"
                fullWidth
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Materials */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Quick Select a Material
        </Typography>
        <Grid container spacing={1}>
          {commonMaterials.map((m) => (
            <Grid item key={m.name}>
              <Button
                variant={parseFloat(density) === m.density ? "contained" : "outlined"}
                onClick={() => setDensity(m.density.toString())}
              >
                {m.name} ({m.density} g/cm³)
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Calculate Button */}
      <Box textAlign="center" mt={4}>
        <Button
          onClick={handleCalculate}
          variant="contained"
          size="large"
          startIcon={loading ? <CircularProgress size={20} /> : <CalculateIcon />}
          disabled={loading}
        >
          {loading ? "Calculating..." : "Run Calculation"}
        </Button>
      </Box>

      {/* Error */}
      {error && (
        <Box mt={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Results */}
      {results && (
        <Box mt={4}>
          <Card>
            <CardHeader title={<><WeightIcon /> Calculation Results</>} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Model Analysis</Typography>
                  <Typography>Triangle Count: {results.triangleCount.toLocaleString()}</Typography>
                  <Typography>Scale Factor: {results.scale}x</Typography>
                  <Typography>Volume: {results.volumeCm3.toFixed(4)} cm³</Typography>
                  <Typography>Imperial Volume: {results.volumeIn3.toFixed(4)} in³</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Estimated Mass</Typography>
                  <Typography>Density: {results.density} g/cm³</Typography>
                  <Typography fontWeight={700}>Mass: {results.massGrams.toFixed(2)} g</Typography>
                  <Typography>Mass (kg): {results.massKg.toFixed(5)} kg</Typography>
                  <Typography>Mass (lbs): {results.massPounds.toFixed(5)} lbs</Typography>
                </Grid>
              </Grid>
              <Box textAlign="center" mt={3}>
                <Button variant="contained" startIcon={<DownloadIcon />}>
                  Download Scaled File
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default STLWeightCalculator;
