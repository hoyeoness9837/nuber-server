import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { verificationTarget } from "src/types/types";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", enum: ["PHOEN", "EAMIL"] })
  target: verificationTarget;
  @Column({ type: "text" })
  payload: string;
  @Column({ type: "text" })
  key: string;
  @Column({ type: "boolean", default: false })
  used: boolean;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Verification;
