import React, { useState } from "react";
import { GreetingsCard } from "../UI/styled/cards";
import { getRandomMatrix } from "../common/helpers";
import { BasicInput, InputColor } from "../UI/styled/inputs";

interface GreetingsComponentProps {
  userName: string;
  userRole: string;
}

const GreetingsComponent: React.FC<GreetingsComponentProps> = ({
  userName,
  userRole,
}) => {
  const matrixCols = Math.floor(window.innerWidth / 20);
  const matrixRows = Math.floor(window.innerHeight / 20);
  const preMatrix = Array(matrixRows).fill(Array(matrixCols).fill(0));
  const [matrix, setMatrix] = useState<number[][]>(getRandomMatrix(preMatrix));
  const [colorA, setColorA] = useState<string>("#FBEAEB");
  const [colorB, setColorB] = useState<string>("#2F3C7E");

  const handleClick = (x: number, y: number) => {
    dfs(x, y, matrix);
    setMatrix([...matrix]);
  };

  const dfs = (x: number, y: number, matrix: number[][]) => {
    if (x < 0 || y < 0 || x >= matrixRows || y >= matrixCols) return;
    if (matrix[x][y] !== 0) {
      matrix[x][y] = 0;
      dfs(x + 1, y, matrix);
      dfs(x - 1, y, matrix);
      dfs(x, y + 1, matrix);
      dfs(x, y - 1, matrix);
      return;
    }
  };
  return (
    <>
      <GreetingsCard>
        <InputColor>
          <BasicInput
            value={colorA}
            onChange={(e) => setColorA(e.target.value)}
          />
          <BasicInput
            value={colorB}
            onChange={(e) => setColorB(e.target.value)}
          />
        </InputColor>
        {matrix.map((row, indexRow) => {
          return (
            <div style={{ display: "flex" }}>
              {row.map((col: any, indexCol: number) => {
                return (
                  <div
                    onClick={() => handleClick(indexRow, indexCol)}
                    style={{
                      transition: "all 0.5s",
                      width: "20px",
                      height: "20px",
                      color: "",
                      backgroundColor:
                        matrix[indexRow][indexCol] === 0
                          ? `${colorA}`
                          : `${colorB}`,
                      border: "0.5px solid black",
                    }}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </GreetingsCard>
    </>
  );
};

export default GreetingsComponent;
