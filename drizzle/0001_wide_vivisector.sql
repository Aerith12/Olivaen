CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stripePaymentIntentId` varchar(255) NOT NULL,
	`stripeCustomerId` varchar(128) NOT NULL,
	`stripeCheckoutSessionId` varchar(255) NOT NULL,
	`userId` int NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerName` text,
	`quantity` int NOT NULL DEFAULT 1,
	`bottleNumber` int,
	`status` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
	`priceId` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_stripePaymentIntentId_unique` UNIQUE(`stripePaymentIntentId`),
	CONSTRAINT `orders_stripeCheckoutSessionId_unique` UNIQUE(`stripeCheckoutSessionId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(128);