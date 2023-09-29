import React, { useState, useEffect } from "react";
import axios from "axios";
import NotificationFilter from "./NotificationFilter";
import NotificationFilterbyTime from "./NotificationFilterbytime";
import styles from "../css/Dashboard.module.css";
import Navbar from "../AdminNavbar";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import DashboardChart from "./DashboardChart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const { adminAuthenticated } = useAuth();
  const [stats, setStats] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (adminAuthenticated) {
      fetchData();
    }
  }, [adminAuthenticated]);

  const fetchData = () => {
    setRefreshing(true);
    axios
      .get("http://localhost:8080/dashboard/getStats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard stats: ", error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const handleRefresh = () => {
    fetchData();
  };

  if (!adminAuthenticated) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  const chartData1 = [
    { label: "Active", value: stats.activeTrueCount },
    { label: "Inactive", value: stats.activeFalseCount },
  ];

  const chartData2 = [
    { label: "Notifications", value: stats.receiveNotificationsCount },
    { label: "Promotions", value: stats.promotionsCount },
    { label: "Latest Plans", value: stats.latestPlansCount },
    { label: "Release Events", value: stats.releaseEventsCount },
  ];

  const chartData3 = [
    { label: "Promotion", value: stats.totalPromotionsCount },
    { label: "Release events", value: stats.totalReleaseEventsCount },
    { label: "Latest plans", value: stats.totalLatestPlansCount },
    { label: "Total", value: stats.totalNotificationsCount },
  ];

  const chartData4 = [
    { label:"Promotions",value: stats.totalPromotionsToUsersCount},
    { label: "Release events", value: stats.totalReleaseEventsToUsersCount },
    { label: "Latest plans", value: stats.totalLatestPlansToUsersCount },
    { label: "Notifications", value: stats.totalNotificationSent },
  ];

  return (
    <div>
      <Navbar />
      <div className={styles["dashboard-container"]}>
        <h1 className={styles["dashboard-title"]}>Dashboard Statistics</h1>
        <button onClick={handleRefresh} className="create-button" style={{ marginLeft: '1000px' }}>
          <FontAwesomeIcon icon={faSync} />  Refresh
        </button>
        <div className={styles["chart-row"]}>
          <div className={styles["chart-column"]}>
            <h1>Users</h1>
            <DashboardChart data={chartData1} className={styles["custom-chart"]} />
          </div>
          <div className={styles["chart-column"]}>
            <h1>User Subscribed</h1>
            <DashboardChart data={chartData2} className={styles["custom-chart"]} />
          </div>
        </div>

        <div className={styles["chart-row"]}>
          <div className={styles["chart-column"]}>
            <h1>Notifications Count</h1>
            <DashboardChart data={chartData3} className={styles["custom-chart"]} />
          </div>
          <div className={styles["chart-column"]}>
            <h1>Notifications Sent</h1>
            <DashboardChart data={chartData4} className={styles["custom-chart"]} />
          </div>
        </div>

        <NotificationFilter />
        <NotificationFilterbyTime />
      </div>
    </div>

  );
}

export default React.memo(Dashboard);
