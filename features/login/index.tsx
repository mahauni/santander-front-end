import { type FormEvent, useState } from "react";
import "./assets/style.css"
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = { email: "", password: "" };
        let valid = true;

        if (!email) {
            newErrors.email = "Email is required.";
            valid = false;
        }
        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            navigate("/analysis")
        }
    };

    return (
        <main className="login-container" role="main" aria-labelledby="loginTitle">
            <div className="branding">
                <div className="logo" aria-hidden="true">SAN</div>
                <div>
                    <h1 id="loginTitle">Welcome back</h1>
                    <p className="lead">Sign in to continue to your analysis page.</p>
                </div>
            </div>

            <form id="loginForm" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-required="true"
                    />
                    {errors.email && (
                        <div id="emailError" className="error" aria-live="polite">
                            {errors.email}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        minLength={6}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-required="true"
                    />
                    {errors.password && (
                        <div id="pwError" className="error" aria-live="polite">
                            {errors.password}
                        </div>
                    )}
                </div>

                <div className="row" style={{ justifyContent: "space-between", marginBottom: "16px" }}>
                    <label className="checkbox">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />
                        <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                            Remember me
                        </span>
                    </label>
                    <a className="muted-link" href="#" id="forgot">
                        Forgot password?
                    </a>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexDirection: "column" }}>
                    <button className="btn" type="submit" id="loginSubmit">
                        Sign in
                    </button>
                </div>
            </form>
        </main>
    );

}
