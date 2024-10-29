import { PrinterData } from "../../constants";
import PrinterLibraryCard from "./printerLibraryCard";

const PrinterLibrary = () => {
  return (
    <>
      <h1>PRINTER LIBRARY</h1>
      <div>
        {PrinterData.map((item) => (
          <PrinterLibraryCard
            title={item.title}
            subTitle={item.subTitle}
            desc={item.desc}
            data={item.data}
          />
        ))}
      </div>
    </>
  );
};
export default PrinterLibrary;
