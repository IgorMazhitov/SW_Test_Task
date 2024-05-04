import React, { useState } from "react";
import { getRandomMatrix } from "../common/helpers";
import { Box, Container, Grid, TextField } from "@mui/material";

interface GreetingsComponentProps {
}

const GreetingsComponent: React.FC<GreetingsComponentProps> = ({
}) => {
  const matrixCols = Math.floor(window.innerWidth / 10);
  const matrixRows = Math.floor(window.innerHeight / 15);
  const preMatrix = Array(matrixRows).fill(Array(matrixCols).fill(0));
  const [matrix, setMatrix] = useState<number[][]>(getRandomMatrix(preMatrix));
  const [colorA, setColorA] = useState<string>("");
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
    <Container sx={{
        minWidth: "100%",
    }}> 
      <Grid container rowSpacing={2}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Color A"
            value={colorA}
            onChange={(e) => setColorA(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Color B"
            value={colorB}
            onChange={(e) => setColorB(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
        {matrix.map((row, indexRow) => {
          return (
            <Box style={{ display: "flex" }}>
              {row.map((col: any, indexCol: number) => {
                return (
                  <Box
                    onClick={() => handleClick(indexRow, indexCol)}
                    style={{
                      transition: "all 0.5s",
                      width: "10px",
                      height: "10px",
                      color: "",
                      backgroundColor:
                        matrix[indexRow][indexCol] === 0
                          ? `${colorA}`
                          : `${colorB}`,
                    }}
                  ></Box>
                );
              })}
            </Box>
          );
        })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GreetingsComponent;
