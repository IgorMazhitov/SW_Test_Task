/**
 * Greetings organism with interactive matrix display
 */
import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { getRandomMatrix } from '../../../shared/utils/helpers';
import TextInput from '../../atoms/TextInput';

/**
 * GreetingsComponent props
 */
export interface GreetingsComponentProps {}

/**
 * Interactive matrix display component
 * @returns React component
 */
const GreetingsComponent: React.FC<GreetingsComponentProps> = () => {
  // Calculate matrix dimensions based on window size
  const matrixCols = Math.floor(window.innerWidth / 10);
  const matrixRows = Math.floor(window.innerHeight / 15);
  const preMatrix = Array(matrixRows).fill(Array(matrixCols).fill(0));
  
  // Component state
  const [matrix, setMatrix] = useState<number[][]>(getRandomMatrix(preMatrix));
  const [colorA, setColorA] = useState<string>("");
  const [colorB, setColorB] = useState<string>("#2F3C7E");

  /**
   * Handle cell click
   */
  const handleClick = (x: number, y: number) => {
    dfs(x, y, matrix);
    setMatrix([...matrix]);
  };

  /**
   * Depth-first search to change connected cells
   */
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
    <Container sx={{ minWidth: "100%" }}> 
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextInput
            name="colorA"
            label="Color A"
            value={colorA}
            onChange={(e) => setColorA(e.target.value)}
            placeholder="Enter a color"
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="colorB"
            label="Color B"
            value={colorB}
            onChange={(e) => setColorB(e.target.value)}
            placeholder="Enter a color"
          />
        </Grid>
        <Grid item xs={12}>
          {matrix.map((row, indexRow) => (
            <Box key={indexRow} sx={{ display: "flex" }}>
              {row.map((_, indexCol: number) => (
                <Box
                  key={`${indexRow}-${indexCol}`}
                  onClick={() => handleClick(indexRow, indexCol)}
                  sx={{
                    transition: "all 0.5s",
                    width: "10px",
                    height: "10px",
                    backgroundColor:
                      matrix[indexRow][indexCol] === 0
                        ? colorA || 'transparent'
                        : colorB,
                  }}
                />
              ))}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GreetingsComponent;
