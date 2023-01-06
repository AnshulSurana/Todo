import styled from 'styled-components';
import { AiOutlineSend } from 'react-icons/ai';

export const GridComponent = styled.div`
    display: block;
    height: 100vh;
`;
export const FlexComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 95vh;
`;

export const GridRow = styled.div`
   margin: 10px;
   margin-top: 8vh;
`;

export const GridColumn = styled.div`
    display: flex;
    margin: 10px;
    height: 45vh;
`;

export const G1R1 = styled.div`
    background-color: #ea8685;
    height: 100%;
    width: 30vw;
    margin: 10px;
    display: flex;
    flex-direction: column;
    font-family: 'PT Serif', serif;
    font-size: 30px;
    color: #1b1b1b;
    justify-content: center;
    align-items: center;
`;
export const G2R1 = styled.div`
    background-color: #0fb9b1;
    height: 100%;
    width: 30vw;
    margin: 10px;
    display: flex;
    flex-direction: column;
`;
export const G3R1 = styled.div`
    background-color: #2d98da;
    height: 100%;
    width: 30vw;
    margin: 10px;
    display: flex;
    flex-direction: column;
`;

export const LabelStyle = styled.div`
    margin: 10px;
    font-size: 20px;
    align-self: center;
    letter-spacing: 0px;
    font-weight: 600;
`;

export const ListInput = styled.div`
    position: relative;
    display: flex;
    width: 25vw;
    margin: auto;
`;

export const ListInputContainer = styled.form`
    position: relative;
    display: flex;
    width: 100%;
    margin: 10px;
    
    > span > input[type="submit"] {
        display: none;
    }
`;

export const InputField = styled.input`
    padding: 24px;
    padding-right: 50px;
    background-color: #fff;
    border: none;
    border-radius: 2px;
    width: 100%;
    color: #000;
    outline: none;
    z-index: 0;
    -webkit-tap-highlight-color: transparent;
    line-height: 1;
    box-shadow: 0px 0px 5px #1e272e;
    border-radius: 5px;
    transition: all ease 240ms;
    
    &:hover {
        box-shadow: 0px 2px 10px #1e272e;
    }
    
    &::-webkit-input-placeholder {
        color: #b7bcdd;
        line-height: 1;
        padding-top: 2px;
    }
    
    &:focus {
        box-shadow: 0px 8px 14px #1e272e;
    }
`;

export const AiOutlineSendComponent = styled(AiOutlineSend)`
    position: absolute;
    z-index: 1;
    opacity: 1;
    left: 90%;
    top: 25%;
    transition: all ease 240ms;
`;

export const UnorderedListComponent = styled.ol`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.4rem;
    list-style-position: initial;
    box-shadow: 0.25rem 1.25rem 1.25rem rgb(0 0 0 / 0.15);
    border-radius: 0.1rem;
    margin: 0px 50px 40px 50px;
    overflow-y: auto;
    
    li {
        border-radius: 10px;
        padding: 0 0 0 1rem;
        margin: 2px;
    }
    & :nth-child(2n) {
        background: white;
    }
    
    & :nth-child(2n+1) {
        background: beige;
    }
    
`;

export const UnorderedDoneListComponent = styled.ol`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.4rem;
    list-style-position: initial;
    box-shadow: 0.25rem 1.25rem 1.25rem rgb(0 0 0 / 0.15);
    border-radius: 0.1rem;
    margin: 0px 50px 40px 50px;
    overflow-y: auto;
    
    li {
        border-radius: 10px;
        padding: 0 0.5rem 0 1rem; 
        margin: 2px;
        display: list-item;
    }
    & :nth-child(2n) {
        background: white;
    }
    
    & :nth-child(2n+1) {
        background: beige;
    }
`;

export const TodoListStyle = styled.li`
    > span {
        background: transparent !important;
        flex: 50%;
    }
    > svg {
        background: transparent !important;
        padding: 7px 10px 0px 0px;
    }
`;

export const DoneListStyle = styled.li`
    > span {
        background: transparent !important;
        flex: 50%;
        > svg {
            background: transparent !important;
            float: right;
        }
    }
`;

export const CheckboxComponent = styled.input.attrs({ type: 'checkbox' })`
    appearance: none;
    background-color: #fff;
    margin: 0 5px;
    font: inherit;
    cursor: pointer;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: inline-flex;
    place-content: center;
    
    &::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        transform: scale(0);
        transform-origin: bottom left;
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
        background-color: CanvasText;
    }
    
    &:checked::before {
        transform: scale(1);
    }
`;

export const TodoEmptyPlaceholder = styled.div`
    font-family: 'Gloria Hallelujah', cursive;
    font-size: 1.4rem;
    font-weight: bold;
    margin: auto;
`;

