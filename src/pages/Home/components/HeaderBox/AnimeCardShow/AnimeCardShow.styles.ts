import styled from "styled-components";
import { CardContent, Typography, Box, Button } from "@mui/material";


export const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 50rem;
`;

export const Content = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 0 auto;
  color: white;
  text-align: center;
`;

export const Title = styled(Typography)`
  font-weight: bold;
`;

export const EpisodeSubtitle = styled(Typography)`
  font-size: 1.8rem;
  color: #ebeaea;
`;

export const Description = styled(Typography)`
  font-size: 1.4rem;
  color: #ebeaea;
  overflow: scroll;
  max-height: 10rem;

  &::-webkit-scrollbar {
    width: 8px;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #55555567;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ButtonsBox = styled(Box)`
  display: flex;
  justify-content: center;
  height: 7rem;
  width: 100%;
  gap: 2rem;
  
`;

export const WatchTrailerButton = styled(Button)`
  font-size: 1.4rem;
  font-weight: bold;
  height: 4rem;
  color: #d3c8fd;
  border: #fff 1px solid;
  box-shadow: 0px 0px 0px 1px #9463d4;
  &:hover {
    background-color: #9463d4;
    color: #fff;
    border: #9463d4 1px solid;
  }
`;

export const ViewDetailsButton = styled(Button)`
  font-size: 1.4rem;
  height: 4rem;
  color: #d3c8fd;
  border: #fff 1px solid;
  box-shadow: 0px 0px 0px 1px #9463d4;
  font-weight: bold;
  &:hover {
    background-color: #9463d4;
    color: #fff;
    border: #9463d4 1px solid;
  }
`;

