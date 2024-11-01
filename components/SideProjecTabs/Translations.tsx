"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Edit2, ChevronDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import EmptyTabs from "./EmptyTabs";

const languages = [
  { value: "es", label: "español" },
  { value: "fr", label: "français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "ja", label: "日本語" },
];

export default function TranslationManager() {
  const [translations, setTranslations] = useState([]);
  const [newTranslation, setNewTranslation] = useState({
    language: null,
    text: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const addTranslation = () => {
    if (newTranslation.language && newTranslation.text) {
      setTranslations([...translations, newTranslation]);
      setNewTranslation({ language: null, text: "" });
      setIsAdding(false);
    }
  };

  const editTranslation = (index) => {
    setEditingIndex(index);
    setNewTranslation(translations[index]);
    setIsAdding(true);
  };

  const updateTranslation = () => {
    const updatedTranslations = [...translations];
    updatedTranslations[editingIndex] = newTranslation;
    setTranslations(updatedTranslations);
    setNewTranslation({ language: null, text: "" });
    setEditingIndex(null);
    setIsAdding(false);
  };

  const deleteTranslation = (index) => {
    const updatedTranslations = translations.filter((_, i) => i !== index);
    setTranslations(updatedTranslations);
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white mb-2">
        <CardContent className="p-6">
          <h1 className=" font-semibold mb-2">Translation Manager</h1>
          <p className="text-xs opacity-80">
            Manage your translations with ease
          </p>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="">
              <div className="flex justify-between items-center mb-4">
                <h2 className=" font-semibold">
                  {editingIndex !== null ? "Edit" : "Add"} Translation
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingIndex(null);
                    setNewTranslation({ language: null, text: "" });
                  }}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="space-x-4 w-full flex items-center">
                <Select
                  defaultValue={languages[0].value}
                  onValueChange={(value) =>
                    setNewTranslation({ ...newTranslation, language: value })
                  }
                >
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* <Textarea
                  value={newTranslation.text}
                  onChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      text: e.target.value,
                    })
                  }
                  placeholder="Enter translation"
                  className="w-full h-32"
                /> */}
                <Button
                  onClick={
                    editingIndex !== null ? updateTranslation : addTranslation
                  }
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white"
                >
                  {editingIndex !== null
                    ? "Update Translation"
                    : "Add Translation"}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full !h-auto"
          >
            <Button
              size={"sm"}
              onClick={() => setIsAdding(true)}
              className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white   text-xs"
            >
              <Plus className="mr-2 h-4 w-4" /> Add translation
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-lg shadow-lg p-6  mt-2">
        <h2 className="font-semibold mb-4 text-sm">Translations</h2>

        {translations.length === 0 ? (
          <Card className="w-full max-w-md mx-auto shadow-none border-none">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center border-none">
              <h2 className="text-xl font-bold mb-2">No translations found</h2>
              <p className="text-muted-foreground text-sm">
                Add a translation to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            <AnimatePresence>
              {translations.map((translation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-b border-gray-200"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-lg font-medium">
                          {
                            languages.find(
                              (lang) => lang.value === translation.language
                            )?.label
                          }
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              editTranslation(index);
                            }}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTranslation(index);
                            }}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 mt-2 p-4 bg-gray-50 rounded-md">
                        {translation?.text}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </Accordion>
        )}
      </div>
    </div>
  );
}
