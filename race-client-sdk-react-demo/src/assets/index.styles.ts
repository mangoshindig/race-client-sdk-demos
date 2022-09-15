import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1200, 1400];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const ParentContainer = styled("div")`
  background-color: #f4f5f7;
  border-radius: 30px 30px;
  bottom: 20px;
  right: 5px;
  box-shadow: #c1c7d0 0 0 0 1px;
  box-sizing: border-box;
  color: #000;
  column-gap: 1em;
  display: flex;
  flex-direction: column;
  line-height: 25px;
  margin-right: 15px;
  max-width: 350px;
  position: fixed;
  height: 520px;
  width: 100vw;
  z-index: 10;
  ${mq[0]} {
    max-width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    margin-right: 0;
    border-radius: 0 0 0 0;
    -webkit-border-radius: 0px 0px 0px 0px;
    overflow: scroll;
  }
`;

export const HeaderContainer = styled("div")`
  height: 100px;
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  ${mq[0]} {
    padding: 1.5em;
    overflow: scroll;
  }
`;

export const ButtonsContainer = styled("div")`
  background-color: #fff;
  border-radius: 30px 30px;
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow-x: scroll;
  ${mq[0]} {
    padding: 1.5em;
    align-items: end;
    row-gap: 1rem;
    overflow: scroll;
    border-radius: 30px 30px 0px 0px;
  }
`;

export const HeaderLogo = styled("img")`
  max-width: 100px;
  height: auto;
  ${mq[0]} {
    max-width: 125px;
  }
`;

export const HeaderButton = styled("a")`
  background-color: #fff;
  border-radius: 50px;
  box-shadow: #c1c7d0 0 0 0 1px;
  box-sizing: border-box;
  color: #000;
  cursor: pointer;
  height: 34px;
  line-height: 25px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #f9fafb;
    cursor: pointer;
  }
  &focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  &focus-visible {
    box-shadow: none;
  }
  ${mq[0]} {
    height: 50px;
    width: 50px;
  }
`;

export const Description = styled("p")`
  color: #091e42;
  font-size: 0.9em;
  line-height: normal;
  text-align: start;
  margin-top: 5px;
  margin-bottom: 5px;
  ${mq[0]} {
    font-size: 18px;
  }
`;

export const Buttons = styled("button")`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #c1c7d0;
  border-radius: 15px;
  box-sizing: border-box;
  color: #091e42;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: 0.75rem 1rem;
  text-align: center;
  text-decoration: none #d1d5db solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.6em;
  &:hover {
    background: #f9fafb;
    cursor: pointer;
  }
  &focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  &focus-visible {
    box-shadow: none;
  }
  &disabled {
    background: #e7e7e7;
    cursor: not-allowed;
  }
  ${mq[0]} {
    padding: 1.75rem 1rem;
    font-size: 20px;
  }
`;

export const ButtonsLink = styled("a")`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #c1c7d0;
  border-radius: 15px;
  box-sizing: border-box;
  color: #091e42;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: 0.75rem 1rem;
  text-align: center;
  text-decoration: none #d1d5db solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.6em;
  &:hover {
    background: #f9fafb;
    cursor: pointer;
  }
  &focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  &focus-visible {
    box-shadow: none;
  }
  &disabled {
    background: #e7e7e7;
    cursor: not-allowed;
  }
  ${mq[0]} {
    padding: 1.75rem 1rem;
    font-size: 20px;
  }
`;

export const WidgetButton = styled("a")`
  background-color: #f4f5f7;
  border-radius: 100px;
  bottom: 20px;
  right: 5px;
  box-sizing: border-box;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 25px;
  margin-right: 15px;
  position: fixed;
  width: 70px;
  height: 70px;
  z-index: 11;
  padding: 10px;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

export const Image = styled("img")`
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 25px;
  position: fixed;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 11;
`;

export const FormContainer = styled("form")`
.form-ui-btn.form-ui-btn-primary {
  box-sizing: border-box;
  width: auto;
  appearance: none;
  background: none rgb(255, 255, 255);
  display: inline-block;
  border: none;
  outline: none;
  transition: background-color 100ms ease-in 0s, box-shadow 100ms ease-in 0s, color 100ms ease-in 0s;
  font-family: inherit;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  margin: 0px;
  cursor: pointer;
  color: rgb(18, 28, 45);
  box-shadow: rgb(136, 145, 170) 0px 0px 0px 1px;
  padding: 0.5rem;
  border-radius: 4px;
  float: right;

  &:hover {
    text-decoration: none;
    color: rgb(3, 11, 93);
    background-color: rgb(235, 244, 255);
    box-shadow: rgb(3, 11, 93) 0px 0px 0px 1px;
  }

  &:active {
    text-decoration: none !important;
    box-shadow: rgb(3, 11, 93) 0px 0px 0px 1px !important;
    color: rgb(3, 11, 93) !important;
    background-color: rgb(204, 228, 255) !important;
  }
}
  background-color: #fff;
  border-radius: 30px 30px;
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex !important;
  flex-direction: column;
  align-content: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  row-gap: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  ${mq[0]} {
    padding: 1.5em;
  }
`;

export const Input = styled("input")`
  appearance: none;
  background-color: #fff;
  border: 2px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: none;
  box-sizing: border-box;
  color: #000;
  cursor: text;
  display: inline-block;
  font-size: 1em;
  font-weight: 400;
  height: 40px;
  line-height: 25px;
  margin: 0;
  padding: 0.5em 0.75em;
  position: relative;
  vertical-align: middle;
  width: 100%;
  ${mq[0]} {
    height: 50px;
  }
`;

export const Label = styled("label")`
  background-color: #fff;
  color: #091e42;
  cursor: text;
  display: inline-block;
  font-size: 0.9em;
  line-height: 25px;
  width: 100%;
  font-weight: 500;
  margin-bottom: 0;
  ${mq[0]} {
    font-size: 18px;
    margin-bottom: 0.3em;
  }
`;

export const FormInputContainer = styled("div")``;

export const LabelContainer = styled("div")`
  margin-bottom: 0.5em;
  ${mq[0]} {
    margin-bottom: 1em;
  }
`;

export const Textarea = styled("textarea")`
  appearance: none;
  background-color: #fff;
  border: 2px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: none;
  box-sizing: border-box;
  color: #000;
  cursor: text;
  display: inline-block;
  font-size: 1em;
  font-weight: 400;
  line-height: 25px;
  padding: 0.5em 0.75em;
  margin: 0;
  position: relative;
  vertical-align: middle;
  width: 100%;
  resize: none;
  ${mq[0]} {
    height: 70px;
  }
`;

export const HeaderButtonsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  column-gap: 0.6em;
  width: 80px;
  ${mq[0]} {
    width: 150px;
  }
`;

export const CallContainer = styled("div")`
  background-color: #fff;
  border-radius: 30px 30px;
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex !important;
  flex-direction: column;
  align-content: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  row-gap: 10px;
  ${mq[0]} {
    padding: 1.5em;
  }
`;

export const CallButtonsContainer = styled("div")``;

export const SeperatorParagraph = styled("hr")`
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

export const LabelWithMargin = styled("label")`
  background-color: #fff;
  color: #091e42;
  cursor: text;
  display: inline-block;
  line-height: 25px;
  width: 100%;
  margin-bottom: 0;
  margin-bottom: 15px;
`;

export const QrCodeContainer = styled("div")`
  background-color: #fff;
  border-radius: 30px 30px;
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex !important;
  flex-direction: column;
  align-content: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  row-gap: 10px;
  ${mq[0]} {
    padding: 1.5em;
  }
`;

export const ImageContainer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100%;
  margin-top: 1em;
  border-radius: 15px;
  background-color: #ffffff;
  border: 1px solid #c1c7d0;
  border-radius: 15px;
`;

export const HangUpButton = styled("button")`
background: #e62143;
cursor: pointer;
display: flex;
font-size: 1.15em;
font-weight: 700;
justify-content: center;
line-height: 33.4929px;
text-align: center;
text-decoration: none;
text-decoration-skip-ink: auto;
text-shadow: rgba(0, 0, 0, .3) 1px 1px 1px;
text-underline-offset: 1px;
transition: all .2s ease-in-out;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
word-break: break-word;
border: none;
display: flex;
justify-content: center;
align-items: center;
border-radius: 15px;
padding: 0.75rem 1rem;
`;

export const SubmitMessage = styled("div")`
display: flex;
justify-content: center;
align-items: center;
align-content: center;
height: 100%;
`;


export const FlexWebChatContainer = styled("div")`
  position: relative;

  .Twilio.Twilio-MainContainer {
    position: relative !important;
    max-height: unset !important;
    bottom: unset !important;
    right: unset !important;
  }
  
  .Twilio.Twilio-EntryPoint {
    display: none;
  }
`;

export const WebCallContainer = styled("div")`
  padding: 1em;
  display: flex;
  flex-direction: row;
  column-gap: 1em;
  align-items: center;
  justify-content: space-between;
  background-color: #f4f5f7;
  border-radius: 15px;
  margin-top: 1.5em;
`;