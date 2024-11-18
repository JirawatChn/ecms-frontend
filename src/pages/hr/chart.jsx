import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Number formatting function (same as original)
function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

const AreaChart = () => {
  const data = {
    labels: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    datasets: [
      {
        label: "จำนวนคอร์ส",
        lineTension: 0.3,
        backgroundColor: "#233B57",
        borderColor: "#233B57",
        pointRadius: 3,
        pointBackgroundColor: "#17263A",
        pointBorderColor: "#17263A",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "#17263A",
        pointHoverBorderColor: "#17263A",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: [10, 8, 9, 10, 7, 0, 1, 9, 10, 9, 9, 10],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 12, // Set to 12 to display all months
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: function (value) {
            return `${number_format(value)} คอร์ส`;
          },
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        titleMarginBottom: 10,
        titleFontSize: 14,
        borderColor: "#dddfeb",
        borderWidth: 1,
        padding: 15,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label || ""}: ${context.raw || ""}`;
          },
        },
      },
    },
  };
  

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChart;
