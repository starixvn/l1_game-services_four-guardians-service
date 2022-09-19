import BearerAuthenticator from "sc-game-base/src/core/helpers/bearer-authenticator";
import helpers from "../../src/helpers/notification-authentication-helpers";
import { logger } from "sc-common";
import Chance from "chance";
import Axios from "axios";

jest.mock("sc-game-base/src/core/helpers/bearer-authenticator");
jest.mock("sc-common");
jest.mock("axios");

describe("notificationAuthenticationHelpers", () => {
    const chance = new Chance();
    const configs = { auth: {} };

    beforeEach(() => {
        jest.clearAllMocks();
        __rewire_reset_all__();
    });

    describe("init", () => {
        it("should assign configs to authenticationConfigs", async () => {
            // Act
            await helpers.init(configs);

            // Assert
            expect(helpers.__get__("authenticationConfigs")).toStrictEqual(configs);
        });

        it("should new bearerAuthenticator with auth config", async () => {
            // Act
            await helpers.init(configs);

            // Assert
            expect(BearerAuthenticator).toBeCalledWith(configs.auth);
        });

        it("should assign value for bearerAuthenticator", async () => {
            // Arrange
            const bearerAuthenticatorInstance = { autoUpdateToken: jest.fn() };
            BearerAuthenticator.mockReturnValueOnce(bearerAuthenticatorInstance);

            // Act
            await helpers.init(configs);

            // Assert
            expect(helpers.__get__("bearerAuthenticator")).toStrictEqual(bearerAuthenticatorInstance);
        });

        it("should call bearerAuthenticator.autoUpdateToken", async () => {
            // Arrange
            const bearerAuthenticatorInstance = { autoUpdateToken: jest.fn() };
            BearerAuthenticator.mockReturnValueOnce(bearerAuthenticatorInstance);

            // Act
            await helpers.init(configs);

            // Assert
            expect(bearerAuthenticatorInstance.autoUpdateToken).toBeCalled();
        });
    });

    describe("post", () => {
        const url = chance.url();
        const endpoint = chance.string();
        const params = {};
        const options = {};
        const defaultDataReturn = {};

        beforeEach(() => {
            Axios.post = jest.fn();
        });

        describe("when bearerAuthenticator is NOT valid", () => {
            beforeEach(() => {
                logger.logError = jest.fn();
                Axios.post.mockResolvedValueOnce({ data: defaultDataReturn });
                helpers.__set__("bearerAuthenticator", null);
            });

            it("should call logger.logError", async () => {
                // Act
                await helpers.post(endpoint, params, options);

                // Assert
                expect(logger.logError).toBeCalledWith("authentication-helper has not been initialized properly.");
            });

            it("should return empty object", async () => {
                // Act
                const actualResult = await helpers.post(endpoint, params, options);

                // Assert
                expect(actualResult).toStrictEqual({});
            });
        });

        describe("when bearerAuthenticator is valid", () => {
            beforeEach(() => {
                helpers.__set__("bearerAuthenticator", {});
                helpers.__set__("authenticationConfigs", { url });
                Axios.post.mockResolvedValueOnce({ data: {} });
            });

            const timeOutTestCase = [
                {
                    postOptionTimeOut: 2000,
                    authConfigTimeOut: 3000,
                    expectResult: 2000,
                },
                {
                    postOptionTimeOut: undefined,
                    authConfigTimeOut: 3000,
                    expectResult: 3000,
                },
                {
                    postOptionTimeOut: undefined,
                    authConfigTimeOut: undefined,
                    expectResult: 2500,
                },
            ];

            timeOutTestCase.forEach(({ postOptionTimeOut, authConfigTimeOut, expectResult }) => {
                it("should set request config timeOut correctly", async () => {
                    // Arrange
                    helpers.__set__("authenticationConfigs", { requestTimeout: authConfigTimeOut, url });

                    // Act
                    await helpers.post(endpoint, params, { requestTimeout: postOptionTimeOut });

                    // Assert
                    expect(Axios.post).toBeCalledWith(`${url}/${endpoint}`, params, { headers: {}, timeout: expectResult });
                });
            });

            it("should return axios.post data", async () => {
                // Act
                const actualResult = await helpers.post(endpoint, params, options);

                // Assert
                expect(actualResult).toStrictEqual(defaultDataReturn);
            });

            describe("when params.languageCode is valid", () => {
                it("should add language code to request header", async () => {
                    // Arrange
                    const languageCode = chance.string();

                    // Act
                    await helpers.post(endpoint, { languageCode }, options);

                    // Assert
                    expect(Axios.post).toBeCalledWith(`${url}/${endpoint}`, params, {
                        headers: { LanguageCode: languageCode },
                        timeout: 2500,
                    });
                });

                it("should remove language code on params", async () => {
                    // Arrange
                    const languageCode = chance.string();
                    const inputParams = { languageCode };

                    // Act
                    await helpers.post(endpoint, inputParams, options);

                    // Assert
                    expect(inputParams.languageCode).toBeUndefined();
                });
            });

            describe("when config useAuthenticate is enabled", () => {
                it("should assign bearer token to request headers authorization", async () => {
                    // Arrange
                    const bearerAuthenticatorInstance = { token: chance.guid() };
                    helpers.__set__("bearerAuthenticator", bearerAuthenticatorInstance);
                    helpers.__set__("authenticationConfigs", { useAuthenticate: true, url });

                    // Act
                    await helpers.post(endpoint, params, options);

                    // Assert
                    expect(Axios.post).toBeCalledWith(`${url}/${endpoint}`, params, {
                        headers: {
                            Authorization: bearerAuthenticatorInstance.token,
                        },
                        timeout: 2500,
                    });
                });
            });
        });
    });
});
