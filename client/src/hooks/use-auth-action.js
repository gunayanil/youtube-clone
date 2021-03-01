import { useAuth } from 'context/auth-context';
import { useGoogleLogin } from 'react-google-login';
import { authenticate } from 'utils/api-client';

export default function useAuthAction() {
  const user = useAuth();
  const { signIn } = useGoogleLogin({
    onSuccess: authenticate,
    clientId:
      '956146487256-cdfdnhmjp9p00op9a06cf3suckqo9ge6.apps.googleusercontent.com',
  });

  function handleAuthAction(authAction, data) {
    if (user) {
      authAction(data);
    } else {
      signIn();
    }
  }

  return handleAuthAction;
}
