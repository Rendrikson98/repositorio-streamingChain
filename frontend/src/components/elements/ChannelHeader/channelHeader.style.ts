import styled from "styled-components";

export const ChannelContainer = styled.div`
    margin-bottom: 120px;
`;

export const ChannelBanner = styled.div`
    height: 250px;
    width: 100%;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const Banner = styled.img`
    width: 100%;
    height: 250px;
`

export const ChannelAvatar = styled.div`
    height: 200px;
    width: 200px;
    border-radius: 50%;
    background-color: red;
    overflow: hidden;
    position: absolute;
    bottom: -100px;
`;

export const Profile = styled.img`
    width: 200px;
    height: 200px;
`