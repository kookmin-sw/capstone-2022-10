import styled from 'styled-components';

const StyledSRBox = styled.div`
    display : grid;
    width : 80vw;
    background : #FBFBFB;
    grid-template-columns : 24vw 1fr;
    margin : 3vh auto;
    padding : 15px;
    border-radius : 5px;

    img.thumbnail {
        background : #EEEEEE;
        width : 24vw;
        height : 24vw;
        border-radius : 10px;
    }

    .chefInfo {
        background : none;
        display : grid;
        grid-template-rows : 2fr 2fr 1fr 1fr;
        margin-left : 15px;

        .chefName {
            display : grid;
            grid-template-columns : 8vw 1fr;
            img{
                margin : 0.5vw;
                width : 7vw;
                height : 7vw;
            }
            h3 {
                line-height : 8vw;
                font-weight : 600;
            }
        }

        p {
            font-weight : 600;
            font-size : 80%;
            line-height : 80%;
            color : #2EC4B6;
        }
    }

    .recipeInfo {
        background : none;
        display : grid;
        grid-template-rows : 1fr 1.2fr 1fr;
        margin-left : 15px;

        h5 {
            line-height : 8vw;
            font-size : 80%;
        }

        h3 {
            margin-top : 1vw;
            font-weight : 600;
            font-size : 5vw;
        }

        p {
            line-weight : 80%;
            font-weight : 600;
            color : #2EC4B6;
        }

    }
`;

export { StyledSRBox };

const PageTitle = styled.h3`
    width : 75vw;
    margin : 3vh auto;
    margin-bottom : 5vh;
    font-size : 1.2rem;
    font-weight : 600;
    div {
        margin : 7px;
        span {
            color : #2EC4B6;
        }
    }
`;

export { PageTitle };
