import styled from "styled-components";

export const ChannelContainer = styled.div`
  max-width: 250px;
  height: 340px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  padding: 20px;
  border-radius: 10px;
`;

export const ChannelThumbnail = styled.div`
  height: 200px;
  width: 200px;
  background-color: #ddd;
  border-radius: 50%;
  overflow: hidden;
  margin: 15px 0;
  
`;

export const ChannelName = styled.h4`
  font-size: 18px;
  font-weight: 300;

  &:hover{
    background-color: #292929;
  }
`;

export const Profile = styled.img`
    width: 200px;
    height: 200px;
`