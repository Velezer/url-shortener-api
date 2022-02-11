import { IsNotEmpty } from "class-validator";

export class CreateUrlDto {
    @IsNotEmpty()
    longUrl: string;
    
    @IsNotEmpty()
    shortUrl: string;
}
