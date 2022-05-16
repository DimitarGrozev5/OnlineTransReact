import styles from "./DxfOverview.module.css";

const DxfOverview = (props) => {
  return (
    <div className={styles["dxf-container"]}>
      <div>
        <h1>DXF файл е зареден и готов за трансформация</h1>
      </div>
      <div>
        Подържани формати:
        <ul>
          <li>AutoCAD 2000/LT2000 DXF (*.dxf)</li>
          <li>AutoCAD 2007/LT2007 DXF (*.dxf)</li>
          <li>AutoCAD 2010/LT2010 DXF (*.dxf)</li>
          <li>AutoCAD 2013/LT2013 DXF (*.dxf)</li>
        </ul>
      </div>
      <div>
        Подържат се следните AutoCAD обекти:
        <ul>
          <li>POLYLINE</li>
          <li>BLOCK</li>
          <li>TEXT</li>
          <li>MTEXT</li>
          <li>ARC</li>
          <li>CIRCLE</li>
          <li>SPLINE</li>
          <li>LINE</li>
          <li>ELLIPSE</li>
          <li>POINT</li>
          <li>SHAPE</li>
          <li>3DFACE</li>
          <li>LEADER</li>
          <li>MLINE</li>
          <li>SOLID</li>
          <li>TABLE</li>
        </ul>
      </div>
      <div>Размери - DIMENSIONS, се игнорират</div>
    </div>
  );
};

export default DxfOverview;
