"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Toolbar } from "./Toolbar";
import { useState } from "react";
interface BlogEditorProps {
  content?: string;
  onChange?: (data: { title: string; content: string }) => void;
  onTitleChange?: (content: string) => void;
  onContentChange?: (title: string) => void;
}
export function BlogEditor({
  content = "",
  onChange,
  onTitleChange,
  onContentChange,
}: BlogEditorProps) {
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Nhập nội dung..." }),
      Underline,
      TextAlign,
      Link,
      Image,
      Highlight,
      TextStyleKit,
      Color,
    ],
    editorProps: {
      attributes: {
        class:
          "prose sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange?.(html);
      onChange?.({ title, content: html });
    },
  });

  const handleTitleChange = (e: any) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTitleChange?.(newTitle);
    onChange?.({ title: newTitle, content: editor?.getHTML() || "" });
  };

  if (!editor) {
    return (
      <div className="border rounded-lg p-8 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toolbar editor={editor} />
      <div className="p-4 space-y-4">
        <input
          id="title"
          type="text"
          placeholder="Tiêu đề"
          required
          value={title}
          onChange={handleTitleChange}
          className="border-none rounded-none text-3xl font-bold outline-none"
        />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
