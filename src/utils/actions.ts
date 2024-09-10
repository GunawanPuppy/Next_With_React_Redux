"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function successLogin(path:string, token:string){
    cookies().set("Authorization", token)
    redirect(path)
}