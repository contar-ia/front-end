"use client";

import { marked } from "marked";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

export const DISCLAIMER_TITLE = "Aviso Importante";
export const DISCLAIMER_TEXT = `
LGPD – Proteção de Dados:
Este sistema processa informações fornecidas pelo usuário exclusivamente para geração de conteúdo personalizado. Nenhuma informação pessoal é armazenada para fins comerciais, e todos os dados são tratados de acordo com os princípios da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).

Direitos Autorais e Uso da História:
As histórias geradas por Inteligência Artificial podem conter elementos criativos que remetem a obras protegidas por terceiros. Por esse motivo, o conteúdo aqui gerado não deve ser comercializado ou distribuído como obra original. Seu uso é restrito a fins pessoais, educacionais e recreativos.

Responsabilidade do Usuário:
Ao utilizar esta plataforma, você concorda em respeitar direitos autorais, evitar o uso indevido do conteúdo gerado e seguir as boas práticas de segurança e privacidade.

Este aviso tem caráter informativo e não substitui orientação jurídica.
`;

export async function exportStoryAsPdf(markdown: string) {
  const html2pdf = (await import("html2pdf.js")).default;
  const html = marked(markdown);

  const container = document.createElement("div");
  container.innerHTML = `
    <div style="
      font-family: Helvetica, sans-serif;
      color: #000;
      font-size: 14px;
      line-height: 1.6;
      padding: 24px;
      max-width: 800px;
    ">
      ${html}
      <hr style="margin: 32px 0;" />

    <h3 style="font-size: 16px; font-weight: bold;">
      ${DISCLAIMER_TITLE}
    </h3>

    <p style="white-space: pre-line; font-size: 12px;">
      ${DISCLAIMER_TEXT}
    </p>
    </div>
  `;

  html2pdf()
    .from(container)
    .set({
      margin: 10,
      filename: "contar-ia.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .save();
}

export async function exportStoryAsDocx(markdown: string) {
  const tokens = marked.lexer(markdown);

  const paragraphs: Paragraph[] = tokens.map((token: any) => {
    if (token.type === "heading") {
      return new Paragraph({
        text: token.text,
        heading:
          token.depth === 1
            ? HeadingLevel.HEADING_1
            : token.depth === 2
            ? HeadingLevel.HEADING_2
            : HeadingLevel.HEADING_3,
        spacing: { after: 300 },
      });
    }

    if (token.type === "paragraph") {
      return new Paragraph({
        children: [
          new TextRun({
            text: token.text,
            font: "Arial",
            size: 24,
          }),
        ],
        spacing: { after: 200 },
      });
    }

    return new Paragraph("");
  });

  const disclaimerParagraphs = [
    new Paragraph({
      text: DISCLAIMER_TITLE,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 200 },
    }),

    ...DISCLAIMER_TEXT.split("\n\n").map(
      (text) =>
        new Paragraph({
          children: [
            new TextRun({
              text,
              size: 20,
              italics: true,
            }),
          ],
          spacing: { after: 200 },
        })
    ),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [...paragraphs, ...disclaimerParagraphs],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "contar-ia.docx");
}
