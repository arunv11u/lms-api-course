import { FirebaseCloudMessaging } from "@arunvaradharajalu/common.firebase-cloud-messaging/build/firebase-cloud-messaging";
import { getFCM } from "../../../src/utils";






describe("Helper Module", () => {

	describe("\"getFCM\" method", () => {
		describe("Happy Path", () => {
			it.skip("Should return firebase cloud messaging", () => {
				const fcm = getFCM();

				expect(fcm).toBeInstanceOf(FirebaseCloudMessaging);
			});
		});
	});
});