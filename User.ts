import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  import * as bcrypt from "bcryptjs";
  import * as jwt from "jsonwebtoken";

  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable:true})
    firstname: string;
  
    @Column({nullable:true})
    lastname: string;


    @Column()
    email: string;

    @Column()
    password:string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    setPassword = (password: string)=>{
      return(this.password = bcrypt.hashSync(password, 8))
    };

    isValidPassword = (password: string)=>{
      return bcrypt.compareSync(password,this.password);
    };


    generateJWT = () =>{
      return jwt.sign(
        {
          email: this.email,
        },
        "SECRET",
        { expiresIn: "1h"}
      );
    }
  }