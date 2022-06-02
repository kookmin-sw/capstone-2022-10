import styled from 'styled-components';

const PageTitle = styled.h3`
    margin : 3vh auto;
    margin-bottom : 5vh;
    font-weight : 600;
    font-size : 1.5rem;
    text-align : center;
`;

export { PageTitle };

const StyledForm = styled.div`
    margin : 0 auto;
    width: 70vw;
    text-algin: center;
    background: #CBF3F0;
    padding : 3vh 10vw 5vh 10vw;
    border-radius: 15px;

    {
        width : 50vw;
        text-align: center;
        margin : 0 auto;
    }

    h5 {
        font-weight : 600;
        margin-top : 2vh;
        margin-bottom : 1vh;
    }

    input {
        border: 0px solid black;
        padding: 1px 10px;
        height : 3.5vh;
        border-radius: 5px;
        box-shadow : 0 -3px 3px rgb(173, 173, 173, 0.6);
    }

    .errormsg{
        display : block;
        height : 15px;
        color: red;
    }
`;

export { StyledForm };

const StyledFormButtonSection = styled.div`
    margin-top : 20px;
    button{
        display : block;
        margin : 1vh auto;
        background : #2EC4B6;
        width : 120px;
        height : 35px;
        font-size : 15px;
        color : white;
        border : none;
        border-radius : 7px;
    }
`;

export { StyledFormButtonSection };
