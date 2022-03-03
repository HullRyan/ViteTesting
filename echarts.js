var myChart = echarts.init(document.getElementById("main"), "dark");

function createChart(data) {
  const dataPath = data.children;
  function getLevelOption() {
    return [
      {
        itemStyle: {
          borderColor: "rgb(0, 80, 53)",
          borderWidth: 4,
          gapWidth: 4
        }
      },
      {
        colorSaturation: [0.2, 0.4],
        itemStyle: {
          borderColorSaturation: 0.7,
          gapWidth: 2,
          borderWidth: 2
        }
      },
      {
        colorSaturation: [0.2, 0.4],
        itemStyle: {
          borderColorSaturation: 0.6,
          gapWidth: 1
        }
      },
      {
        colorSaturation: [0.2, 0.4]
      }
    ];
  }
  const option = {
    title: {
      text: "UNCC Faculty + Interests",
      left: "center",
      padding: 25
    },
    legend: {
      type: "scroll",
      orient: "horizontal"
    },
    tooltip: {
      formatter: function (info) {
        //console.log(info);
        return [
          "<div>" + info.name + "</div>" + "Academic Interests: " + info.value
        ].join("");
      }
    },
    dataset: {
      source: dataPath
    },
    series: [
      {
        name: "UNCC",
        type: "treemap",
        levels: getLevelOption(),
        data: dataPath,
        animationDurationUpdate: 1000,
        visibleMin: 20,
        leafDepth: 2,
        upperLabel: {
          show: true,
          //backgroundColor: 'transparent',
          //borderColor: 'white',
          textShadowColor: "black",
          textShadowBlur: "3",
          textShadowOffset: "2",
          color: "white",
          textBorderColor: "black",
          textBorderWidth: "",
          height: 30
        },
        universalTransition: true,
        id: "pie",
        emphasis: {
          focus: "self"
        },
        label: {}
        /*encode: {
          itemName: "College Name",
          value: "College Publications",
          tooltip: "Publications"
        }*/
      }
    ]
  };
  myChart.setOption(option);
  myChart.on("click", function (event) {
    console.log(event);
  });

  document.getElementById("load1").addEventListener("click", function () {
    myChart.setOption({
      series: [
        {
          type: "sunburst",
          universalTransition: true,
          itemStyle: {
            borderColor: "white",
            borderCap: "round",
            borderJoin: "round",
            borderWidth: "1"
          },
          levels: getLevelOption(),
          data: dataPath,
          label: {
            show: false
          }
        }
      ]
    });
  });
  document.getElementById("load2").addEventListener("click", function () {
    myChart.setOption({
      series: [
        {
          type: "tree",
          data: [data],
          layout: "",
          left: "2%",
          right: "2%",
          top: "8%",
          bottom: "20%",
          symbol: "emptyCircle",
          orient: "vertical",
          expandAndCollapse: true,
          label: {
            position: "top",
            rotate: -90,
            verticalAlign: "middle",
            align: "right",
            fontSize: 9
          },
          leaves: {
            label: {
              position: "bottom",
              rotate: -90,
              verticalAlign: "middle",
              align: "left"
            }
          },
          universalTransition: true
        }
      ]
    });
  });
  document.getElementById("load3").addEventListener("click", function () {
    myChart.setOption({
      series: [
        {
          name: "UNCC",
          type: "treemap",
          levels: getLevelOption(),
          data: dataPath,
          animationDurationUpdate: 1000,
          visibleMin: 20,
          leafDepth: 2,
          upperLabel: {
            show: true,
            //backgroundColor: 'transparent',
            //borderColor: 'white',
            textShadowColor: "black",
            textShadowBlur: "5",
            textShadowOffset: "2",
            color: "white",
            textBorderColor: "black",
            textBorderWidth: "",
            height: 30
          },
          universalTransition: true,
          id: "pie",
          emphasis: {
            focus: "self"
          },
          label: {}
        }
      ]
    });
  });
  document.getElementById("load4").addEventListener("click", function () {
    myChart.setOption({
      series: [
        {
          type: "pie",
          universalTransition: true,
          data: dataPath
        }
      ]
    });
  });
}

function loadData() {
  const url =
    "https://raw.githubusercontent.com/HullRyan/test_data/main/school_newest.json";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      //console.log([uncc]);
      //console.log(data.Colleges);
      createChart(json);
    });
}

// Display the chart using the configuration items and data just specified.
loadData();