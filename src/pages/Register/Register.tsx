import {
  FormEvent,
  useState,
} from "react";

import { useNavigate } from "react-router";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { register } from "../../services/auth.service";

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await register({
        firstName,
        lastName,
        email,
        password,
      });

      navigate("/dashboard");
    } catch {
      setError("Could not create account.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Loading message="Creating account..." />
    );
  }

  return (
    <section>
      <h1>Register</h1>

      {error && (
        <ErrorMessage message={error} />
      )}

      <form onSubmit={handleSubmit}>
        <Input
          id="firstName"
          name="firstName"
          label="First name"
          type="text"
          value={firstName}
          onChange={(event) =>
            setFirstName(event.target.value)
          }
          required
        />

        <Input
          id="lastName"
          name="lastName"
          label="Last name"
          type="text"
          value={lastName}
          onChange={(event) =>
            setLastName(event.target.value)
          }
          required
        />

        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <Button type="submit">
          Create account
        </Button>
      </form>
    </section>
  );
}

export default Register;
