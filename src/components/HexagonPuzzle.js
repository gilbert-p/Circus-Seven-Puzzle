import React, { useState, useEffect, useRef } from "react";
import { testCaseSolved, solutionToGrid } from "../Variables.js";
import { gsap } from "gsap";

const HexagonPuzzle = () => {
  const [puzzle, setPuzzle] = useState(solutionToGrid);
  const [solution, setSolution] = useState([]);
  const [animationDone, setAnimationState] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  let hexagonListMain = [];

  let limit = 7;

  const rotateFromIndex = (list, index) => {
    let newList = list.slice(index);

    let tempVar = newList[0];

    for (let ii = 0; ii < newList.length; ii++) {
      newList[ii % newList.length] = newList[(ii + 1) % newList.length];
    }
    newList[newList.length - 1] = tempVar;

    return list.slice(0, index).concat(newList);
  };

  const compareOneSide = (centerHex, prevHex) => {
    let flag = false;

    centerHex[0] === prevHex[0] ? (flag = true) : (flag = false);

    if (flag) {
      console.log(
        `${centerHex} matched with ${prevHex} at ${centerHex[0]} and ${prevHex[0]}`
      );
    }

    return flag;
  };

  const compareTwoSides = (centerHex, prevHex, matchingHex, iteration) => {
    let flag = false;
    let count = 0;
    let temp = 0;

    if (prevHex[prevHex.length - 1] == matchingHex[1]) {
      count += 1;
    }

    temp = iteration - 1;
    if (centerHex[temp] == matchingHex[0]) {
      count += 1;
    }

    if (count >= 2) {
      console.log(`${centerHex} matched with ${prevHex} and ${matchingHex}`);
      flag = true;
    }
    return flag;
  };

  const compareThreeSides = (
    centerHex,
    matchingHex,
    prevHex,
    firstHex,
    iteration
  ) => {
    let flag = false;
    let count = 0;
    let currentcurrentIndex = iteration - 1;

    //compare center with matching
    if (matchingHex[0] == centerHex[currentcurrentIndex]) {
      count++;
    }

    //compare prev hex with matching hex
    if (matchingHex[1] == prevHex[prevHex.length - 1]) {
      count++;
    }

    //compare first matched hex with matching hex

    if (matchingHex[matchingHex.length - 1] == firstHex[1]) {
      count++;
    }

    count >= 3 ? (flag = true) : (flag = false);

    if (count >= 3) {
      console.log(
        `${centerHex} matched with ${matchingHex}, ${prevHex}, and ${firstHex}`
      );
    }

    return flag;
  };

  const baseCaseCheck = (solutionList, length) => {
    if (solutionList.length >= length) {
      return true;
    }

    return false;
  };

  const checkIfSolved = (hexList) => {
    let count = 0;

    let centerHex = hexList[0];
    let prevHex;
    let matchingHex;
    let firstHex;

    for (let currentIndex = 0; currentIndex < 6; currentIndex++) {
      switch (currentIndex) {
        case 0:
          matchingHex = hexList[currentIndex + 1];
          if (centerHex[currentIndex] == matchingHex[0]) {
            console.log(
              `${centerHex} matched with ${matchingHex} at ${centerHex[currentIndex]} and ${matchingHex[currentIndex]}`
            );
            count++;
          }
          break;
        case 1:
          prevHex = hexList[currentIndex];
          matchingHex = hexList[currentIndex + 1];
          if (centerHex[currentIndex] == matchingHex[0]) {
            if (matchingHex[1] == prevHex[5]) {
              console.log(
                `${centerHex} matched with ${matchingHex} at index 0, 0 and ${prevHex} matched with ${matchingHex} at 5, 1`
              );
              count++;
            }
          }
          break;
        case 2:
          prevHex = hexList[currentIndex];
          matchingHex = hexList[currentIndex + 1];
          if (centerHex[currentIndex] == matchingHex[0]) {
            if (matchingHex[1] == prevHex[5]) {
              console.log(
                `${centerHex} matched with ${matchingHex} at index 0, 0 and ${prevHex} matched with ${matchingHex} at 5, 1`
              );
              count++;
            }
          }
          break;
        case 3:
          prevHex = hexList[currentIndex];
          matchingHex = hexList[currentIndex + 1];
          if (centerHex[currentIndex] == matchingHex[0]) {
            if (matchingHex[1] == prevHex[5]) {
              console.log(
                `${centerHex} matched with ${matchingHex} at index 0, 0 and ${prevHex} matched with ${matchingHex} at 5, 1`
              );
              count++;
            }
          }
          break;
        case 4:
          prevHex = hexList[currentIndex];
          matchingHex = hexList[currentIndex + 1];
          if (centerHex[currentIndex] == matchingHex[0]) {
            if (matchingHex[1] == prevHex[5]) {
              console.log(
                `${centerHex} matched with ${matchingHex} at index 0, 0 and ${prevHex} matched with ${matchingHex} at 5, 1`
              );
              count++;
            }
          }
          break;
        case 5:
          firstHex = hexList[1];
          prevHex = hexList[currentIndex];
          matchingHex = hexList[currentIndex + 1];
          if (centerHex[currentIndex] == matchingHex[0]) {
            if (matchingHex[1] == prevHex[5]) {
              if (matchingHex[5] == firstHex[1]) {
                console.log(
                  `${centerHex} matched with ${matchingHex} at index 0, 0 and ${prevHex} matched with ${matchingHex} at 5, 1 and ${matchingHex} matched with ${firstHex} at 5, 1`
                );
                count++;
              }
            }
          }
          break;
        default:
          console.log("Input Error");
      }
    }
    if (count >= 6) {
      console.log(true);
      return true;
    }
    console.log(false);
    return false;
  };

  const rotateCounterClockwise = (list, rotationCount) => {
    for (let rotations = 0; rotations < rotationCount; rotations++) {
      list = rotateFromIndex(list, 0);
    }
    return list;
  };

  const adjustSolution = (list) => {
    for (let hexIndex = 0; hexIndex < list.length; hexIndex++) {
      switch (hexIndex) {
        case 0:
          list[hexIndex] = rotateCounterClockwise(list[hexIndex], 1);
          break;
        case 1:
          list[hexIndex] = rotateCounterClockwise(list[hexIndex], 4);
          break;
        case 2:
          list[hexIndex] = rotateCounterClockwise(list[hexIndex], 3);
          break;
        case 3:
          list[hexIndex] = rotateCounterClockwise(list[hexIndex], 2);
          break;
        case 4:
          list[hexIndex] = rotateCounterClockwise(list[hexIndex], 1);
          break;
        case 5:
          list[hexIndex] = rotateCounterClockwise(list[hexIndex], 0);
          break;
        case 6:
          list[hexIndex] = rotateCounterClockwise(list[hexIndex], 5);
          break;
      }
    }
    return list;
  };

  const solve = (hexagonList, hexagonIteration, isSolved) => {
    if (!hexagonList) {
      return;
    }
    console.log(hexagonList);

    if (isSolved || hexagonIteration >= 7) {
      console.log("Solved!", hexagonList);
      setSolution(hexagonList);
      return isSolved;
    }

    //base case

    //debugger;
    if (hexagonIteration == 0) {
      let swapMid = 0;
      let currentHexagonList = hexagonList.slice();
      for (; swapMid < hexagonList.length; swapMid++) {
        for (let midRotations = 0; midRotations < 6; midRotations++) {
          isSolved = solve(currentHexagonList, hexagonIteration + 1, isSolved);
          if (isSolved) {
            console.log("base case iteration 0");
            return isSolved;
          }
          currentHexagonList[0] = rotateFromIndex(currentHexagonList[0], 0);
        }

        /* 0th index represents the center hexagon */
        currentHexagonList = rotateFromIndex(currentHexagonList, 0);
        //debugger;
        console.log(`Swapped Mid: ${currentHexagonList[0]}`);
        console.log("mid swapped", swapMid);
      }

      console.log("Mid swapped max. No Solution");
    }

    if (hexagonIteration == 1) {
      let currentHexagonList = hexagonList.slice();
      for (
        let listRotations = 0;
        listRotations < currentHexagonList.length - hexagonIteration;
        listRotations++
      ) {
        for (
          let currentHexRotations = 0;
          currentHexRotations < 6;
          currentHexRotations++
        ) {
          if (
            compareOneSide(
              currentHexagonList[0],
              currentHexagonList[hexagonIteration]
            )
          ) {
            isSolved = solve(
              currentHexagonList,
              hexagonIteration + 1,
              isSolved
            );
            console.log("backtracked");
            if (isSolved) {
              return isSolved;
            }
            currentHexagonList[hexagonIteration] = rotateFromIndex(
              currentHexagonList[hexagonIteration],
              0
            );
            //backtracking by rotating hexagon
          } else {
            console.log(
              `Before Rotation hex: ${currentHexagonList[hexagonIteration]}`
            );
            currentHexagonList[hexagonIteration] = rotateFromIndex(
              currentHexagonList[hexagonIteration],
              0
            );
            console.log(
              `After Rotation hex: ${currentHexagonList[hexagonIteration]}`
            );
          }
        }
        currentHexagonList = rotateFromIndex(
          currentHexagonList,
          hexagonIteration
        );
      }
    }

    if (hexagonIteration > 1 && hexagonIteration < 6) {
      let currentHexagonList = hexagonList.slice();
      for (
        let listRotations = 0;
        listRotations < currentHexagonList.length - hexagonIteration;
        listRotations++
      ) {
        for (
          let currentHexRotations = 0;
          currentHexRotations < 6;
          currentHexRotations++
        ) {
          if (
            compareTwoSides(
              currentHexagonList[0],
              currentHexagonList[hexagonIteration - 1],
              currentHexagonList[hexagonIteration],
              hexagonIteration
            )
          ) {
            isSolved = solve(
              currentHexagonList,
              hexagonIteration + 1,
              isSolved
            );
            if (isSolved) {
              return isSolved;
            }
            currentHexagonList[hexagonIteration] = rotateFromIndex(
              currentHexagonList[hexagonIteration],
              0
            );
            //backtracking by rotating hexagon
          } else {
            console.log(
              `Before Rotation hex: ${currentHexagonList[hexagonIteration]}`
            );
            currentHexagonList[hexagonIteration] = rotateFromIndex(
              currentHexagonList[hexagonIteration],
              0
            );
            console.log(
              `After Rotation hex: ${currentHexagonList[hexagonIteration]}`
            );
          }
        }

        currentHexagonList = rotateFromIndex(
          currentHexagonList,
          hexagonIteration
        );
      }
    }

    if (hexagonIteration == 6) {
      let currentHexagonList = hexagonList.slice();
      for (
        let currentHexRotations = 0;
        currentHexRotations < 6;
        currentHexRotations++
      ) {
        if (
          compareThreeSides(
            currentHexagonList[0],
            currentHexagonList[hexagonIteration],
            currentHexagonList[hexagonIteration - 1],
            currentHexagonList[1],
            hexagonIteration
          )
        ) {
          isSolved = true;
          isSolved = solve(currentHexagonList, hexagonIteration + 1, isSolved);
          if (isSolved) {
            return isSolved;
          }
          currentHexagonList[hexagonIteration] = rotateFromIndex(
            currentHexagonList[hexagonIteration],
            0
          );
          //backtracking by rotating hexagon
        } else {
          console.log(
            `Before Rotation hex: ${currentHexagonList[hexagonIteration]}`
          );
          currentHexagonList[hexagonIteration] = rotateFromIndex(
            currentHexagonList[hexagonIteration],
            0
          );
          console.log(
            `After Rotation hex: ${currentHexagonList[hexagonIteration]}`
          );
        }
      }
    }
    //debugger;
    return isSolved;
  };

  const triangleClassnames = (colorLetter) => {
    switch (colorLetter) {
      case "P":
        return "#fa05d5";
      case "O":
        return "#ff8c00";
      case "R":
        return "#fa057e";
      case "B":
        return "#0605fa";
      case "G":
        return "#05fa81";
      case "Y":
        return "#f9fa05";
      default:
        console.log(colorLetter);
        console.log("color input invalid");
    }
  };

  useEffect(() => {
    hexagonListMain = puzzle.map((hex) => {
      return hex.split("");
    });
    // hexagonListMain = adjustSolution(hexagonListMain);
    setSolution(hexagonListMain.slice());
  }, []);

  const animateSolution = () => {
    if (!animationDone) {
      gsap.to("#hex-0", { rotation: 660, duration: 3, ease: "bounce.out" });
      gsap.to("#hex-1", { rotation: 480, duration: 3, ease: "bounce.out" });
      gsap.to("#hex-2", { rotation: 420, duration: 3, ease: "bounce.out" });
      gsap.to("#hex-3", { rotation: 600, duration: 3, ease: "bounce.out" });
      gsap.to("#hex-4", { rotation: 660, duration: 3, ease: "bounce.out" });
      gsap.to("#hex-5", { rotation: 360, duration: 3, ease: "bounce.out" });
      gsap.to("#hex-6", { rotation: 420, duration: 3, ease: "bounce.out" });
      setAnimationState(!animationDone);
    } else {
      gsap.set("#hex-0", { rotation: 0, duration: 3 });
      gsap.set("#hex-1", { rotation: 0, duration: 3 });
      gsap.set("#hex-2", { rotation: 0, duration: 3 });
      gsap.set("#hex-3", { rotation: 0, duration: 3 });
      gsap.set("#hex-4", { rotation: 0, duration: 3 });
      gsap.set("#hex-5", { rotation: 0, duration: 3 });
      gsap.set("#hex-6", { rotation: 0, duration: 3 });
      setAnimationState(!animationDone);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      "#puzzle-title",
      { opacity: 0, y: "50px" },
      { opacity: 1, y: "0", duration: 1.2 }
    );
    gsap.fromTo(
      "#title-underline",
      { opacity: 0, y: "50px" },
      { opacity: 1, y: "0", duration: 1.2 }
    );
    gsap.fromTo(
      ".puzzle-info",
      { opacity: 0, x: "-150" },
      { opacity: 1, x: "0", duration: 2, ease: "bounce.out" }
    );
  }, []);

  useEffect(() => {
    function handleResize() {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);

      window.addEventListener("resize", handleResize);

      // return window.removeEventListener("resize", handleResize);
    }
    handleResize();
  });

  return (
    <>
      <div
        className="title-content"
        style={{
          transform: `scale(${
            Math.min(viewportWidth / 820, viewportHeight / 820) * 1
          })`,
        }}>
        <h1 id="puzzle-title">
          Circus Seven Puzzle <span id="title-underline"></span>
        </h1>

        <div className="puzzle-info">
          <div className="info-title">What is this?</div>
          <div className="info-body">
            Circus Seven is a puzzle consisting of seven large hexagonal nuts,
            each piece has six colours, and there is a perfect correspondence
            with the colors of the puzzle.
          </div>
        </div>
      </div>
      <div
        className="hex-container"
        style={{
          transform: `scale(${
            Math.min(viewportWidth / 820, viewportHeight / 820) * 1
          })`,
        }}>
        {solution.map((hex, hexIndex) => {
          return (
            <div className="hexagon" id={`hex-${hexIndex}`} key={hex}>
              {hex.map((triangle, key) => {
                return (
                  <div
                    id={key}
                    key={key}
                    className={`triangle`}
                    style={{
                      borderColor: `${triangleClassnames(
                        hex[key]
                      )} transparent`,
                    }}>
                    {/* {triangle} */}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div id="solve-button" onClick={animateSolution}>
        {animationDone ? "RESET" : "SOLVE"}
      </div>
    </>
  );
};

export default HexagonPuzzle;
