import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Auth0Provider } from "@auth0/auth0-react";

const Login = ({setUserId}) => {
        const [allUsers, setAllUsers] = useState([]);

        // useEffect(() => {
        //     fetch("/users")
        //         .then((res) => res.json())
        //         .then((data) => {
        //             console.log(data.data);
        //             setAllUsers(data.data);
        //             console.log(allUsers);
        //         })
        //         .catch(error => {
        //             console.log("error")
        //         })
        // }, []);


    const [login, setLogin] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if (value.length === 0){
            // let login = {...login};
            delete login[key]
            setLogin({
                ...login
            })
        } else {
            setLogin({
                ...login,
                [key]: value
            })
        }
    };

    // MAP THRU users database !!!!! - setUserId to corresponding _id associated with email address
    // const verifyLogin = () => {
    //     if (Object.values(users).includes(login.email) && Object.values(users).includes(login.password)) {
    //         console.log("email and password are in database");
    //     } else {
    //        window.alert("not found")
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataBody = {...login};

        try {
            // await verifyLogin();

            // const res = await fetch(`/users/${userId}`, {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({  ...dataBody })
            })
            .then(res => res.json())
            .then((data) => {
                console.log("logged in letttts goooooooo")
                console.log(data.data);
                window.localStorage.setItem("userId", JSON.stringify(data.data));
                setUserId(data.data._id);
                navigate("/");
            })

            const data = await res.json()

            navigate("/");

        } catch (err) {
            setErrorMessage(err.message);
        }

    };

        return (
            <Wrapper>
                <Auth0Provider><LoginButton /></Auth0Provider>
                <LogoutButton />
                <div>
                <Container>
                    <StyledForm onSubmit={(e) => handleSubmit(e)}>
                        <TitleLabel>Login</TitleLabel>

                            <Input
                                type="email"
                                placeholder="Email"
                                name="email"
                                required={true}
                                onChange={handleChange}
                            />
                                 <Input
                                type="password"
                                placeholder="Password"
                                name={"password"}
                                required={true}
                                onChange={handleChange}
                            />

                        <ButtonContainer>
                            <Submit type="submit" disabled={Object.keys(login).length < 2}>Login</Submit>
                        </ButtonContainer>
                    </StyledForm>
                    {errorMessage.length > 0 &&
                        <ErrorContainer>
                            <ErrorMessage>Error: {errorMessage}</ErrorMessage>
                        </ErrorContainer>
                    }
                </Container>
                </div>

            </Wrapper>
        )
    };

const Wrapper = styled.div`
display: flex-wrap;
justify-content: center;
margin: auto;
width: 80vw;
gap: 50px;
flex-wrap: wrap;
`
const Button = styled.button`
    text-decoration: none;
    padding: 10px;
    font-weight: bold;
    color: #082A63;

    &:active {
        color: #3C73CF;
    }

    &:hover {
        color: #3C73CF;
    }
`;

const Container = styled.div`
display: flex;

justify-content: center;
align-items: center;
margin: auto;
width: 45vw;
background: white;
padding: 50px 0 20px 0;
box-shadow: 0px 0px 5px 1px lightgrey;
`

const Input = styled.input`
width: auto;
height: 25px;
display: flex;
`

const Submit = styled.button`
width: 100%;
margin: 10px 0;
background-color: darkblue;
color: white;
border: none;
cursor: pointer;

&:hover{
    background-color: lightblue;
    color: inherit;
}

&:disabled{
    background-color: darkgrey;
    border: none;
    color: white;
    cursor: default;
}
`

const ButtonContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const StyledForm = styled.form`
display: flex;
gap: 20px;
flex-direction: column;
margin: 0;
width: 80%;
height: auto;
`

const TitleLabel = styled.label`
font-size: 1.3em;
font-weight: bold;
`


const ErrorContainer = styled.div`
display: flex;
border: 2px solid darkred;
width: 80%;
margin-top: 10px;
margin-bottom: 0;
height: 50px;
`

const ErrorMessage = styled.p`
padding-left: 10px;
color: darkred;
`


export default Login;
