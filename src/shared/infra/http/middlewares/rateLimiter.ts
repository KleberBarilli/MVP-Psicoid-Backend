import rateLimiter from "express-rate-limit";

export const defaultApiLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000, //15 minutes
	max: 100, // Limit each IP to 100 request per window
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const sendMailLimiter = rateLimiter({
	windowMs: 60 * 60 * 1000, //60 minutes
	max: 5, // Limit each IP to 5 request per window
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
