import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { ReactNode } from 'react';

const clientId = '1079476190023-esoodjheb0blodtroofvlo4dba3of03k.apps.googleusercontent.com';

interface GoogleOAuthProviderProps {
  children: ReactNode;
}

const GoogleOAuthLoginProvider: React.FC<GoogleOAuthProviderProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthLoginProvider;
