import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssessmentDto {
  @IsNotEmpty()
  @IsNumber()
  chain: number;

  @IsNotEmpty()
  @IsNumber()
  projectType: number;

  @IsNotEmpty()
  @IsNumber()
  revenueSource: number;

  @IsNotEmpty()
  @IsNumber()
  projectStage: number;

  @IsNotEmpty()
  @IsNumber()
  coreGoal: number;

  @IsNotEmpty()
  @IsNumber()
  riskPreference: number;

  @IsOptional()
  @IsString()
  projectDescription?: string;
}
