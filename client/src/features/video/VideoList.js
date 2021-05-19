import useSelection from "antd/lib/table/hooks/useSelection";
import { useSelector } from "react-redux";

export function videoList() {

    const videoList = useSelector(getVideoList) || [];
    return (

      <div className={styles.gridContainer}>
        {videoList.map((item) => {
            <div>item.name</div>
        })}
      </div>
    );
  }