import { sockets } from "../src/socket";



describe("Socket Module", () => {
	describe("\"listen\" fn", () => {
		describe("Happy Path", () => {
			it("Socket server passed as an argument, should start listening to sockets", () => {
				const isSocketsListening = sockets.listen();

				expect(isSocketsListening).toBe(true);
			});
		});
	});
});