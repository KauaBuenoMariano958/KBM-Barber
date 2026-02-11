"use client"

import React from "react"
import { Button } from "./ui/button"
import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod" //Importa a biblioteca Zod para validação de dados
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form" //Importa componentes de formulário personalizados

const formSchema = z.object({
  search: z.string().trim().min(1, {
    message: "Digite algo para buscar",
  }), //Validação para garantir que a busca tenha pelo menos 3 caracteres
})

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  const router = useRouter()

  const handleSubmitForm = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${encodeURIComponent(data.search)}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="flex w-full gap-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Faça sua busca..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}

export default Search
