"use client"

import { Image, Authenticator, ThemeProvider, View, useTheme, Theme } from "@aws-amplify/ui-react";
import "../app/globals.css";
import "../app/styles.css"
// import "@aws-amplify/ui-react/styles.css";

const theme: Theme = {
  name: 'gtc-theme',
  tokens: {
    colors: {
      font: {
        primary: {
          value: '#171717',          
        },
        secondary: {
          value: '#171717',          
        },
        tertiary: {
          value: '#171717',          
        },
      },
      // button: {
      //   primary: {
      //     background: {
      //       value: '#0ea5e9',
      //     },
      //     color: {
      //       value: '#ffffff',
      //     },
      //     hover: {  },
      //   }
      // }
    }
  }

};

const Components = {
  
    Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="GTC logo"
          src="./logo-1.svg"
          width="190px"
          height="90px"
        />
      </View>
    );
  },


}

const formFields = {
  signIn: {
    username: {
      placeholder: '',
    },
    password: {
      placeholder: '',
    },
  },
}



export default function AuthenticatorWrapper ({
  children,}: {
  children: React.ReactNode;
})  {
  return <ThemeProvider theme={theme}>
    <Authenticator components={Components} formFields={formFields} 
    >

    {children}
    
    </Authenticator>
    </ThemeProvider>;
}