import { Module } from "@nestjs/common";
import { starterController } from "./starter.controller";
import { starterService } from "./starter.service";

@Module({
    controllers : [starterController],
    providers : [starterService]
})
export class StarterModule {}