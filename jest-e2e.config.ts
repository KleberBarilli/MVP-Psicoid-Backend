import jestConfig from "./jest.config";

export default {
	...jestConfig,
	testEnvironment: "./prisma/prisma-test-environment.ts",
	testMatch: ["**/*.e2e-spec.ts"],
};
