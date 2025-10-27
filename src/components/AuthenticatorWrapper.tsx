"use client"

import { Image, Authenticator, ThemeProvider, View, useTheme, Theme } from "@aws-amplify/ui-react";
import "../app/globals.css";
import "@aws-amplify/ui-react/styles.css";
import "../app/styles.css"


const theme: Theme = {
  name: 'gtc-theme',
  tokens: {
    colors: {
      font: {
        primary: { value: '#171717' },
        secondary: { value: '#171717' },
        tertiary: { value: '#171717' },
      },
      brand: {
        primary: {
          10: { value: '#f0f9ff' },
          80: { value: '#047d95' },
          90: { value: '#0369a1' },
          100: { value: '#0284c7' },
        }
      },
    },

    components: {
      authenticator: {
        router: {
          boxShadow: { value: '0 0 16px rgba(0, 0, 0, 0.1)' },
          borderWidth: { value: '0' },
        },
        form: {
          padding: { value: '2rem' },
        }
      }
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