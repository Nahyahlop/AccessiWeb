import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await fetch(
                backendUrl + "/api/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            navigate("/signin");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    return (

        <main
            className="container py-5"
            aria-labelledby="signup-title"
        >

            <section className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-5">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4 p-md-5">

                            <header className="mb-4">

                                <h1
                                    id="signup-title"
                                    className="h2 fw-bold"
                                >
                                    Create your account
                                </h1>

                                <p className="text-muted mb-0">
                                    Start saving and managing your accessibility audits.
                                </p>

                            </header>

                            {
                                error && (

                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        {error}
                                    </div>
                                )
                            }

                            <form onSubmit={handleSubmit} noValidate>

                                {/* USERNAME */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="username"
                                        className="form-label fw-semibold"
                                    >
                                        Username
                                    </label>

                                    <input
                                        id="username"
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        autoComplete="username"
                                        aria-describedby="username-help"
                                    />

                                    <div
                                        id="username-help"
                                        className="form-text"
                                    >
                                        Optional display name.
                                    </div>

                                </div>

                                {/* EMAIL */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        aria-required="true"
                                        aria-describedby="email-help"
                                    />

                                    <div
                                        id="email-help"
                                        className="form-text"
                                    >
                                        We’ll never share your email.
                                    </div>

                                </div>

                                {/* PASSWORD */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="password"
                                        className="form-label fw-semibold"
                                    >
                                        Password
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength="6"
                                        autoComplete="new-password"
                                        aria-required="true"
                                        aria-describedby="password-help"
                                    />

                                    <div
                                        id="password-help"
                                        className="form-text"
                                    >
                                        Password must contain at least 6 characters.
                                    </div>

                                </div>

                                {/* BUTTON */}

                                <button
                                    type="submit"
                                    className="btn btn-dark w-100 py-2"
                                    disabled={loading}
                                    aria-busy={loading}
                                >
                                    {
                                        loading
                                            ? "Creating account..."
                                            : "Create account"
                                    }
                                </button>

                            </form>

                            <p className="text-center mt-4 mb-0">

                                Already have an account?{" "}

                                <Link to="/signin">
                                    Log in
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
};