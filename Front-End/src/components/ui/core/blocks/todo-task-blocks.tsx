import type React from "react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/fragments/shadcn/empty"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "../../fragments/shadcn/button"
import { Input } from "../../fragments/shadcn/input"

import { Note05FreeIcons, Plus, X } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Checkbox } from "../../fragments/shadcn/checkbox"
import type { Todo } from "@/types/todos-types"

import { LogoAdaptive } from "../../fragments/icons/logo-app"
import { DecorIcon } from "../../fragments/icons/decor-icon"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTodos } from "@/hooks/user-todo"

export function TodoBlock() {
  const [input, setInput] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTextInitial, setEditingTextInitial] = useState("")
  const [editingText, setEditingText] = useState("")
  const [transitioningItem, setTransitioningItem] = useState<{
    text: string
    id: string
    startY: number
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { saveEdit, addTodo, todos, clearCompleted, deleteTodo, toggleTodo } =
    useTodos()
  const handleDoubleClick = (todo: Todo) => {
    setEditingId(todo.id)
    setEditingTextInitial(todo.text)
    setEditingText(todo.text)
  }
  const updateTodo = () =>
    saveEdit({
      editingText,
      editingId,
      editingTextInitial,
      setEditingId,
      setEditingText,
    })
  const createTodo = () =>
    addTodo({
      inputRef,
      input,
      setInput,
      setTransitioningItem,
      listRef,
    })
  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      updateTodo()
    } else if (e.key === "Escape") {
      setEditingId(null)
      setEditingText("")
    }
  }

  const isMobile = useIsMobile()
  return (
    <>
      <div className="min m-auto">
        <div className="relative border-b px-6 md:px-0">
          <header className="relative m-auto flex max-w-xl items-center justify-center gap-4 border-r border-l py-4">
            <LogoAdaptive className="scale-75" />
            <h1 className="text-2xl font-bold">FoggyNotion</h1>
            <DecorIcon className="left-0 z-50" position="bottom-left" />
            <DecorIcon className="rigth-0 z-50" position="bottom-right" />
          </header>
        </div>
        <div className="sticky top-0 z-40 border-b bg-background px-6 md:px-0">
          <div className="relative z-40 m-auto flex max-w-xl gap-0 border-r border-l border-border bg-background md:top-0">
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createTodo()}
              placeholder="Add a task..."
              className={cn(
                "m-auto flex-1 rounded-none border-0 bg-transparent text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none",
                transitioningItem && "text-transparent"
              )}
            />

            <DecorIcon className="left-0 z-50" position="bottom-left" />
            <DecorIcon className="rigth-0 z-50" position="bottom-right" />
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={createTodo}
              className="rounded-none border-0 border-l border-border px-6 py-6 transition-colors duration-200 hover:bg-accent"
            >
              <HugeiconsIcon className="size-5 text-primary" icon={Plus} />
            </Button>
          </div>
        </div>
        <div className="px-6 md:px-0">
          <section
            ref={listRef}
            className={cn(
              "relative m-auto h-[80dvh] max-w-xl divide-y divide-border border-r border-l"
            )}
          >
            {todos.length > 0 && (
              <>
                <AnimatePresence>
                  {transitioningItem && (
                    <motion.div
                      initial={{
                        y: transitioningItem.startY,
                        opacity: 1,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="pointer-events-none absolute inset-s-0 inset-e-0 z-10 flex items-center gap-0 bg-background"
                    >
                      <div className="h-12 w-12 border-e border-border" />
                      <div className="flex-1 px-4 py-3">
                        <span className="text-foreground">
                          {transitioningItem.text}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="popLayout">
                  {todos.map((todo, index) => (
                    <motion.div
                      key={todo.id}
                      layout
                      initial={{
                        opacity: transitioningItem?.id === todo.id ? 0 : 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                          opacity: {
                            duration: 0.2,
                            delay: transitioningItem?.id === todo.id ? 0.4 : 0,
                          },
                          height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                        },
                      }}
                      exit={{
                        x: -500,
                        opacity: 0,
                        height: 0,
                        transition: {
                          x: { duration: 0.3, ease: [0.4, 0, 1, 1] },
                          opacity: { duration: 0.2 },
                          height: { duration: 0.2, delay: 0.3 },
                        },
                      }}
                      className={cn(
                        "group relative flex items-center gap-0 transition-all duration-200 hover:bg-accent/50",
                        index == todos.length - 1 && "border-b border-border"
                      )}
                    >
                      <div className="flex size-12 items-center justify-center rounded-none border-0 border-r border-border transition-colors">
                        <Checkbox
                          onClick={() => toggleTodo(todo.id)}
                          checked={todo.completed}
                          className={cn(
                            "hit-area-4 h-4 w-4 rounded-none border border-border transition-all duration-300"
                          )}
                        />
                      </div>

                      <div
                        className="flex-1 px-4 py-3"
                        onDoubleClick={() => handleDoubleClick(todo)}
                      >
                        {editingId === todo.id ? (
                          <Input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                            onBlur={updateTodo}
                            autoFocus
                            className="w-full border-b border-foreground bg-transparent text-sm text-foreground focus:outline-none"
                          />
                        ) : (
                          <span
                            className={cn(
                              "text-foreground transition-all duration-300",
                              todo.completed &&
                                "line-through decoration-foreground/40 opacity-40"
                            )}
                          >
                            {todo.text}
                          </span>
                        )}
                      </div>

                      <Button
                        variant={"ghost"}
                        onClick={() => deleteTodo(todo.id)}
                        className="size-12 rounded-none border-0 border-l border-border text-destructive transition-all duration-200 md:text-primary md:opacity-0 md:group-hover:opacity-100 md:hover:bg-destructive/10 md:hover:text-destructive"
                      >
                        <HugeiconsIcon icon={X} />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </>
            )}
            {todos.length == 0 && !isMobile && (
              <Empty className="pt-16">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <HugeiconsIcon icon={Note05FreeIcons} />
                  </EmptyMedia>
                  <EmptyTitle className="">No tasks yet</EmptyTitle>
                  <EmptyDescription className="">
                    start adding your new task!
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button
                    onClick={() => {
                      inputRef.current?.focus()
                    }}
                    variant="outline"
                    className="rounded-none"
                    size="sm"
                  >
                    Create Task
                  </Button>
                </EmptyContent>
              </Empty>
            )}
          </section>
        </div>
        <footer className="sticky bottom-0 border-t px-6 md:px-0">
          <div className="relative m-auto flex w-full max-w-xl items-center justify-between border-r border-l bg-background px-4 py-3 text-xs text-muted-foreground">
            <DecorIcon className="left-0 z-50" position="top-left" />
            <DecorIcon className="rigth-0 z-50" position="top-right" />
            <span>
              {todos.filter((t) => !t.completed).length} of {todos.length} tasks
              remaining
            </span>

            <Button
              variant={"ghost"}
              disabled={todos.filter((t) => !t.completed).length < 0}
              onClick={clearCompleted}
              className="transition-colors duration-200 hover:text-foreground"
            >
              Clear completed
            </Button>
          </div>
        </footer>
      </div>
    </>
  )
}
