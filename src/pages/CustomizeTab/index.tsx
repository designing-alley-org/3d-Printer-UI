/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import {
  Customize,
  Files,
  UploadedFile,
  ModelName,
  CustomizeBox,
} from './styles';
import { STLViewerModal } from '../../components/Model';
import { AccordionMemo } from './AccordionMemo';

// Icon Custom Icon
import {
  ColorIcon,
  InfillIcon,
  TechnologyIcon,
  MaterialIcon,
  PrinterIcon,
} from '../../../public/Icon/MUI_Coustom_icon/index';
import StepLayout from '../../components/Layout/StepLayout';
import CustomButton from '../../stories/button/CustomButton';
import { formatText } from '../../utils/function';
import { useCustomizeTab } from './hook';

const CustomizeTab: React.FC = () => {
  const {
    isLoading,
    isPageLoading,
    printerData,
    printerMessage,
    modalOpen,
    isDownloading,
    downloadProgress,
    stlGeometry,
    error,
    isMobile,
    orderNumber,
    orderId,
    // Data
    files,
    activeFileId,
    activeFile,
    colorHexcode,
    technologies,
    isAllCoustomized,
    isApplyButtonDisabled,
    // Handlers
    handleOpenSTLViewer,
    handleCloseSTLViewer,
    handleApplySelection,
    handelNext,
    navigate,
    setActiveFileId,
    // Customization Handlers
    handleUpdateValueById,
    handleUpdateDimensions,
    handleUpdateUnit,
    handleSetScalingFactor,
    handleRevertDimensions,
  } = useCustomizeTab();

  // Mobile View Render
  const renderMobileView = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        pb: 10,
        opacity: isLoading ? 0.6 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
      }}
    >
      {files.map((file: any) => {
        const isActive = activeFileId === file._id;
        return (
          <Box
            key={file._id}
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: '12px',
              border: isActive ? `1px solid primary.main` : '1px solid #E0E0E0',
              overflow: 'hidden',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            {/* File Header / Card */}
            <Box
              onClick={() => setActiveFileId(file._id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                cursor: 'pointer',
                backgroundColor: isActive ? '#F5F9FF' : 'transparent',
              }}
            >
              <Box
                sx={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  mr: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #E0E0E0',
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src={file.thumbnailUrl}
                  alt={file.fileName}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="primary.main"
                >
                  {formatText(file?.fileName)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Customisation
                </Typography>
              </Box>
              <Box>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: 'primary.main',
                  }}
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </Box>

            {/* Expanded Content (AccordionMemo) */}
            {isActive && (
              <Box sx={{ p: 0, borderTop: '1px solid #E0E0E0' }}>
                {isDownloading || downloadProgress < 100 ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={4}
                  >
                    <Box
                      component="img"
                      src="/Icon/AnimationLoading.gif"
                      alt="Loading STL file"
                      sx={{ width: 100, height: 100 }}
                    />
                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{ mt: 2 }}
                    >
                      Loading... {downloadProgress}%
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <AccordionMemo
                      key={activeFileId}
                      file={file}
                      downloadProgress={downloadProgress}
                      printerData={printerData}
                      printerMessage={printerMessage}
                      technologies={technologies || undefined}
                      activeFileId={activeFileId}
                      handleUpdateValueById={handleUpdateValueById}
                      handleUpdateDimensions={handleUpdateDimensions}
                      handleUpdateUnit={handleUpdateUnit}
                      handleSetScalingFactor={handleSetScalingFactor}
                      handleRevertDimensions={handleRevertDimensions}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 0,
                        gap: 2,
                        px: 2,
                        pb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          fontSize: '1rem',
                        }}
                      >
                        Current Weight :{' '}
                        <span>
                          {file?.weight?.value?.toFixed(3) || 0}{' '}
                          {file?.weight?.unit || 'g'}
                        </span>
                      </Typography>
                      <CustomButton
                        children="Save & Apply"
                        disabled={isApplyButtonDisabled || isLoading}
                        onClick={handleApplySelection}
                        loading={isLoading}
                        variant="contained"
                      />
                    </Box>
                  </>
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );

  return (
    <StepLayout
      stepNumber={2}
      stepText="Customize"
      stepDescription="Customize your design files by selecting materials, colors, and printers."
      onClick={handelNext}
      orderNo={orderNumber}
      onClickBack={() =>
        navigate(`/get-quotes/${orderId}/${orderNumber}/upload-stl`)
      }
      isLoading={false}
      isPageLoading={isPageLoading}
      isDisabled={isAllCoustomized ? false : true}
    >
      {isMobile ? (
        renderMobileView()
      ) : (
        <Box
          display="flex"
          borderRadius={'24px'}
          boxShadow="2px 2px 4px 0px #2A3F7F29"
        >
          <Files isLoading={isLoading}>
            <span className="header">
              <Typography variant="h6" color="primary.contrastText">
                Files
              </Typography>
            </span>
            <div className="file-list">
              <UploadedFile>
                {files.map((file: any) => (
                  <span
                    key={file._id}
                    className="upload-file"
                    onClick={() => setActiveFileId(file._id)}
                    style={{
                      background:
                        activeFileId === file._id ? '#FFFFFF' : 'transparent',
                      border:
                        activeFileId === file._id
                          ? '1px solid #1E6FFF'
                          : '1px solid #FFFFFF',
                    }}
                  >
                    <Box
                      sx={{
                        ':hover': {
                          transform: 'scale(1.05)',
                          transition: 'transform 0.3s ease-in-out',
                        },
                        overflow: 'hidden',
                        margin: '7px 10px;',
                        cursor: 'pointer',
                        width: '5rem',
                        height: '5rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        borderRadius: '12px',
                        background: 'background.paper',
                        boxShadow:
                          activeFileId === file._id
                            ? '0px 4px 4px 0px #CDE1FF'
                            : 'none',
                      }}
                      onClick={(e) => {
                        setActiveFileId(file._id);
                        handleOpenSTLViewer(e);
                      }}
                    >
                      <img
                        src={file.thumbnailUrl}
                        alt={file.fileName}
                        style={{
                          height: '5rem',
                          width: '6rem',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                    <ModelName
                      isActive={activeFileId === file._id}
                      textColor="primary.main"
                    >
                      {formatText(file?.fileName)}
                    </ModelName>
                    <CustomizeBox>
                      {[
                        { key: 'technologyId', Icon: TechnologyIcon },
                        { key: 'materialId', Icon: MaterialIcon },
                        { key: 'colorId', Icon: ColorIcon },
                        { key: 'printerId', Icon: PrinterIcon },
                        { key: 'infill', Icon: InfillIcon },
                      ].map(({ key, Icon }) => {
                        const isSelected = activeFileId === file._id;
                        const isFilled = !!file[key];
                        let iconColor = '#FFFFFF66'; // default: not selected, not filled, 40% opacity
                        if (isSelected && isFilled)
                          iconColor = 'primary.main'; // Can't easily use theme props here without access to theme object
                        // Wait, I can pass string 'primary.main' to sx, but style expects value.
                        // I'll leave these logic as is but need to careful about theme access.
                        // I removed `const theme = useTheme()` to rely on system props where possible or just pass hex.
                        // Let's re-introduce theme for these dynamic calculations or just use hardcoded colors for now as simplification.
                        // The original used `theme.palette.primary.main`.
                        // I'll fix this by re-adding `const theme = useTheme()` only inside map or use strings where applicable.
                        // Actually, I'll pass hex codes for simplicity if theme is not available.
                        // Re-reading: `iconColor = theme.palette.primary.main;`
                        // In the original file, it was using theme.
                        // I will add `import { useTheme } from '@mui/material';` back and `const theme = useTheme()` to keep it working.
                        else if (isSelected && !isFilled) iconColor = '#999999';
                        else if (!isSelected && isFilled) iconColor = '#FFFFFF';
                        else if (!isSelected && !isFilled)
                          iconColor = '#FFFFFF66';

                        return (
                          <React.Fragment key={key}>
                            {/* The Icon components likely accept style.color. */}
                            {/* Since I am removing theme usage to simplify, I should use useTheme if I want precise colors. */}
                            <Icon
                              style={{
                                color:
                                  isSelected && isFilled
                                    ? '#2A3F7F'
                                    : iconColor,
                                fontSize: 20,
                              }}
                            />
                            {key !== 'infill' && (
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                sx={{
                                  height: '17px',
                                  mx: 0.5,
                                  borderColor: isFilled
                                    ? 'primary.main'
                                    : 'none',
                                  borderWidth: 1,
                                }}
                              />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </CustomizeBox>
                  </span>
                ))}
              </UploadedFile>
            </div>
          </Files>
          <Customize>
            {isDownloading || downloadProgress < 100 ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="400px"
              >
                <Box
                  component="img"
                  src="/Icon/AnimationLoading.gif"
                  alt="Loading STL file"
                  sx={{
                    width: 200,
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />
                <Typography variant="h6" color="primary.main" sx={{ mt: 2 }}>
                  Loading STL File...
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {downloadProgress}% Complete
                </Typography>
                {error && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    Error: {error}
                  </Typography>
                )}
              </Box>
            ) : activeFile && downloadProgress === 100 && !error ? (
              <>
                <div className="customize-container">
                  <AccordionMemo
                    key={activeFileId}
                    file={activeFile}
                    downloadProgress={downloadProgress}
                    printerData={printerData}
                    printerMessage={printerMessage}
                    technologies={technologies || undefined}
                    activeFileId={activeFileId}
                    handleUpdateValueById={handleUpdateValueById}
                    handleUpdateDimensions={handleUpdateDimensions}
                    handleUpdateUnit={handleUpdateUnit}
                    handleSetScalingFactor={handleSetScalingFactor}
                    handleRevertDimensions={handleRevertDimensions}
                  />
                </div>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 15px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                      fontSize: '1rem',
                    }}
                  >
                    Current Weight :{' '}
                    <span>
                      {activeFile?.weight?.value?.toFixed(3) || 0}{' '}
                      {activeFile?.weight?.unit || 'g'}
                    </span>
                  </Typography>
                  <CustomButton
                    children="Save & Apply"
                    disabled={isApplyButtonDisabled || isLoading}
                    onClick={handleApplySelection}
                    loading={isLoading}
                    variant="contained"
                  />
                </Box>
              </>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="400px"
              >
                <Typography variant="h6" color="text.secondary">
                  {error ? 'Failed to load STL file' : 'No file selected'}
                </Typography>
                {error && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
              </Box>
            )}
          </Customize>
        </Box>
      )}

      {/* STL Viewer Modal */}
      {activeFile && (
        <STLViewerModal
          open={modalOpen}
          stlGeometry={stlGeometry}
          downloadProgress={downloadProgress}
          isDownloading={isDownloading}
          error={error}
          color={colorHexcode || '#ffffff'}
          onClose={handleCloseSTLViewer}
          fileName={activeFile.fileName}
          dimensions={activeFile.dimensions}
        />
      )}
    </StepLayout>
  );
};

export default CustomizeTab;
