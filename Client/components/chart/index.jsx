import { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import c3 from "c3";

const colors = ["#64a15f", "#b8d8af", "#e89173", "#f47448", "#e8a473"];
let Average = [2.59, 3.78, 3.37,5.35,2.59];
//get random colors

const getRandomValue = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

function getColumnsColors(columns) {
  return columns.reduce(
    (acc, column, index) => ({
      ...acc,
      [column[0]]: getRandomValue(colors),
    }),
    {}
  );
}

const ChartWrapper = styled("div")(({ theme }) => ({}));

export function Chart({ columns, chartType, userData }) {
  const ref = useRef();

  useEffect(() => {
    // const columns = [
    //   ["User Input", userData[0]['socialMedia'],  userData[0]['dailystudingtime'],  userData[0]['travellingTime'],  userData[0]['StressLevel']],
    //   ["Average", 2.59, 3.78, 3.37, 5.35, 2.59, 2.52],
    // ];
    let chart;
    if (chartType === "category" && userData[0]) {

      chart = c3.generate({
        data: {
          xs: {
            userInput: "userInput_x",
            Average: "Average_x",
          },
          // iris data from R
          columns: [
            [
              "userInput_x",
              "SocialMedia",
              "pursueCareerBasedDegree",
              "Dailystudingtime",
              "TravellingTime",
              "StressLevel",
            ],
            [
              "Average_x",
              "SocialMedia",
              "pursueCareerBasedDegree",
              "Dailystudingtime",
              "TravellingTime",
              "StressLevel",
            ],
            [
              "userInput",
              userData[0].socialMedia || 0,
              userData[0].pursueCareer || 0,
              userData[0].dailystudingtime || 0,
              userData[0].travellingTime || 0,
              userData[0].stressLevel  || 0,
            ],
            ["Average", 2.59, 3.78, 3.37,5.35,2.59],
          ],
          type: "scatter",
        },
        // size: {
        //   height: 400,
        //   width: 850,
        // },
        axis: {
          x: {
            type: "category",
            categories: [
              "socialMedia",
              "pursueCareerBasedDegree",
              "dailystudingtime",
              "travellingTime",
              "StressLevel",
            ],
          },
          y: {
            // label: 'Petal.Width'
            max: 6,
            min: 0,
            padding: { top: 0, bottom: 0 },
          },
        },
        tooltip: {
      
          format: {
            title: function (d) {
              if (d == 0) {
                return "socialMedia";
              } else if (d == 1) {
                return "pursueCareerBasedDegree";
              } else if (d == 2) {
                return "dailystudingtime";
              } else if (d == 3) {
                return "travellingTime";
              }else if (d == 4) {
                return "StressLevel";
              }
            },
            value: function (value, ratio, feature, d) {
              let text = "";
              if (d == 0) {
                if (feature == "userInput" && value <= 2.59) {
                  text =
                    "Mnemonics develops mnemonic devices (mnemonic bridges), for example as mnemonic sentences, rhymes, diagrams or graphics. In addition to small mnemonic aids, mnemonics also include complex systems that can be used to reliably remember entire books, lists with thousands of words, or thousand-digit numbers. Mnemonics serve to improve the storage and retention of information in long-term memory, since they represent schematized reconstruction plans with which the contents to be remembered are linked to more easily accessible external structures (e.g. rhythm and rhyme, places).";
                } else if (feature == "userInput" && value > 2.59) {
                  text =
                    "Literature suggests that the prior manipulation of the situation can positively influence learning behavior by creating a space which is free from distraction. That is, smartphone and laptop should not be within reach of the person to prevent multitasking. The learning environment should also be equipped with all the necessities (water, food) to avoid distractions such as getting drinks.";
                } else if (feature == "Average") {
                  text = "Average is " + Average[0];
                }
              }else if (d == 1) {
                if (feature == "userInput" && value >= 3.78) {
                  text =
                    "You have good Long-term goals";
                } else if (feature == "userInput" && value < 3.78) {
                  text ="Long-term goals , The focus here is on the development of a long-term strategy for the sustainable optimization of learning. Goal setting in the form of congruent goals plays an important role and creation of a goal system, whereby the goals are arranged hierarchically. This goal system forms the basis for motivation and self-control.";
                  
                }else if (feature == "Average") {
                  text = "Average is " + Average[1];
                }
              } else if (d == 2) {
                if (feature == "userInput" && value >= 3.37) {
                  text =
                    "Sleep Sufficient sleep is also necessary, as this promotes the incorporation of knowledge into long-term memory. ";
                } else if (feature == "userInput" && value < 3.37) {
                  text =
                    "Loci Method: The loci method (Latin locus place, place) is a mnemonic learning method and association technique. It is easy to learn and is used by virtually all memory athletes because of its effectiveness. This method can also be used for extensive learning material, as images are better remembered than mere information such as text or numbers; it also benefits from the associative functioning of the human brain.";
                } else if (feature == "Average") {
                  text = "Average is " + Average[2];
                }
              } else if (d == 3) {
                console.log(value, feature, text, d);
                if (feature == "userInput" && value > 5.35) {
                  text = "Traveling time can be used to learn.";
                } else if (feature == "userInput" && value <= 5.35) {
                  text =
                    "Travelling time 45 minutes each way is a perfect amount of time to listen to an audiobook or podcast in another language. Use your commute time to expand your skills. It will look good on your resume and open up new opportunities for you in the future.";
                } else if (feature == "Average") {
                  text = "Average is "+ Average[3];
                }
              }  else if (d == 4) {
                console.log(value, feature, text, d);
                if (feature == "userInput" && value <= 2.59) {
                  text = "You're Stress Level seems to be good. A quick tip for you to optimize your learning behavior: The focus here is on the development of a long-term strategy for the sustainable optimization of learning. Goal setting in the form of congruent goals plays an important role and creation of a goal system, whereby the goals are arranged hierarchically. This goal system forms the basis for motivation and self-control.";
                } else if (feature == "userInput" && value > 2.59) {
                  text = "The training of mindfulness as a means against certain temptations, is a crucial factor to increase the resistance to impulse-driven actions through a high degree of self-control and to build up a so-called mental gap in the attentional phase, which promotes congruent decisions with the goal. ";
                } else if (feature == "Average") {
                  text = "Average is " + Average[4];
                }
              }

              return value, feature, text;
              //  return(value, feature)
              // var format = id === 'data1' ? d3.format(',') : d3.format('h');
              // return format(value);
            },
            //            value: d3.format(',') // apply this format to both y and y2
          },
        },
        bindto: ref.current,
      });
    } else if (chartType === "Timeseries" && userData.length > 0) {
      const columns = [["x"], ["dailystudingtime"], ["socialMedia"]];
      for (let i = 0; i < userData.length; i++) {
        columns[0].push(userData[i].created_at);
        columns[1].push(userData[i].dailystudingtime);
        columns[2].push(userData[i].socialMedia);
      }

      chart = c3.generate({
        data: {
          x: "x",

          columns,
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              format: "%Y-%m-%d",
            },
          },
        },

        bindto: ref.current,
      });
    }

    console.log("chart ...", chart, userData);
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [userData]);

  return <ChartWrapper ref={ref} />;
}
