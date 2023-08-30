import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import styled from "styled-components";
import { signInAPI } from "../action";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";

import "./Login.css";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const Container = styled.div``;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;

  & > a {
    width: 130px;
    height: 35px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px;
  text-decoration: none;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 1);
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  border-radius: 25px;
  color: #0a66c2;
  font-size: 16px;
  font-weight: 600;
  transition-duration: 167ms;
  line-height: 40px;
  padding: 10px 25px;
  text-align: center;
  background-color: transparent;
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    box-shadow: inset 0 0 0 2px #0a66c2;
  }
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    min-height: 0;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      width: 100%;
      font-size: 20px;
      line-height: 2;
    }
  }
  img {
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 230px;
      position: initial;
      width: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin: 20px auto 0;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 56px;
  width: 100%;
  border-radius: 30px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%),
    inset 0 0 0 1px rgb(0 0 0 / 0);
  border: none;
  vertical-align: middle;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  z-index: 0;
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
    box-shadow: inset 0 0 0 2px rgb(0 0 0 / 60%),
      inset 0 0 0 3px rgb(0 0 0 / 0%), inset 0 0 0 2px rgb(0 0 0 / 0);
  }
  img {
    margin-right: 25px;
  }
`;

function Login(props) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      console.log("submitted");
      await login(values.email, values.password);
    } catch (error) {
      toast({
        title: "Invalid email or password",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const google_login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <Container>
      {props.user && <Navigate to="/feed" />}
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="" />
        </a>
        <div className="flex">
          <a href="/finantari-neramburasible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 60 17"
              focusable="false"
              aria-busy="false"
            >
              <path
                d="m11 9.5h5v1h-5v-1zm5-5h-12v3h12v-3zm-5 8h5v-1h-5v1zm9-12v13c0 1.657-1.343 3-3 3h-14c-1.657 0-3-1.343-3-3v-13h20zm-2 2h-16v11c0 0.552 0.449 1 1 1h14c0.551 0 1-0.448 1-1v-11zm-9 7h-5v3h5v-3z"
                fill="currentColor"
                fillOpacity=".9"
                width="4vh"
                height="4vh"
              ></path>
            </svg>
            <span>Finantari nerambursabile</span>
          </a>
          <a href="/finantari-ramburasible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 55 17"
              focusable="false"
              aria-busy="false"
            >
              <path
                d="m11 9.5h5v1h-5v-1zm5-5h-12v3h12v-3zm-5 8h5v-1h-5v1zm9-12v13c0 1.657-1.343 3-3 3h-14c-1.657 0-3-1.343-3-3v-13h20zm-2 2h-16v11c0 0.552 0.449 1 1 1h14c0.551 0 1-0.448 1-1v-11zm-9 7h-5v3h5v-3z"
                fill="currentColor"
                fillOpacity=".9"
                width="4vh"
                height="4vh"
              ></path>
            </svg>
            <span>Finantari rambursabile</span>
          </a>
          <a href="/credite">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 17"
              focusable="false"
              aria-busy="false"
            >
              <path
                d="m11 9.5h5v1h-5v-1zm5-5h-12v3h12v-3zm-5 8h5v-1h-5v1zm9-12v13c0 1.657-1.343 3-3 3h-14c-1.657 0-3-1.343-3-3v-13h20zm-2 2h-16v11c0 0.552 0.449 1 1 1h14c0.551 0 1-0.448 1-1v-11zm-9 7h-5v3h5v-3z"
                fill="currentColor"
                fillOpacity=".9"
                width="4vh"
                height="4vh"
              ></path>
            </svg>
            <span>Credite</span>
          </a>
        </div>
        <div>
          <Join>Join Now</Join>
          <SignIn>Sign In</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="/images/login-hero.svg" alt="" />
        </Hero>

        <Form>
          <Flex
            height="40vh"
            fontSize="xx-large"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              direction="column"
              alignItems="center"
              background={useColorModeValue("gray.100", "gray.700")}
              p={12}
              rounded={6}
            >
              <Heading mb={6}>Login</Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                  <Input
                    placeholder="Email"
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="email"
                    size="lg"
                    width="40vh"
                    height="4vh"
                    mt={6}
                    {...register("email", {
                      required: "This is required field",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email}>
                  <Input
                    placeholder="Password"
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="password"
                    size="lg"
                    width="40vh"
                    height="4vh"
                    mt={6}
                    {...register("password", {
                      required: "This is required field",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  isLoading={isSubmitting}
                  loadingText="Logging in..."
                  width="100%"
                  height="4vh"
                  colorScheme="green"
                  variant="outline"
                  mt={6}
                  mb={6}
                  type="submit"
                >
                  Login
                </Button>
              </form>
              <Button
                onClick={() => {
                  console.log("clicked");
                  navigate("/register");
                }}
                width="100%"
                height="4vh"
                colorScheme="gray"
                variant="outline"
                mt={6}
              >
                Register Instead
              </Button>
            </Flex>
          </Flex>
          <GoogleOAuthProvider clientId="393199535543-054543anql844ijpg1phpbt5ciqm83hm.apps.googleusercontent.com">
            <Google onClick={() => google_login()}>
              <img src="/images/google.svg" alt="" />
              Sign in with Google
            </Google>
            {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
          </GoogleOAuthProvider>
        </Form>
      </Section>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
