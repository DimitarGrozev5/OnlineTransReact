import { useState } from "react";
import styles from "./KrokiResults.module.css";

const KrokiResults = ({ lines }) => {
  const tabs = [
    {
      title: "Линии",
      content: lines.toString(),
    },
    {
      title: "test",
      content: "test",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const changeTabHandler = (index) => () => setActiveTab(index);

  return (
    <>
      <nav>
        <ul>
          {tabs.map((tab, index) => (
            <li className={index === activeTab ? styles["active-tab"] : ""}>
              <button onClick={changeTabHandler(index)}>{tab.title}</button>
            </li>
          ))}
        </ul>
      </nav>
      <div>{tabs[activeTab].content}</div>
    </>
  );
};

export default KrokiResults;
