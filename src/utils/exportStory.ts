import { marked } from "marked";
import html2pdf from "html2pdf.js";

export async function exportStoryAsPdf(markdown: string) {
  const html2pdf = (await import("html2pdf.js")).default;
  const html = marked(markdown);

  const container = document.createElement("div");
  container.innerHTML = `
    <div style="
      font-family: 'Helvetica', sans-serif;
      color: #000000;
      font-size: 14px;
      line-height: 1.6;
      padding: 24px;
      max-width: 800px;
    ">
      <style>
        h1, h2, h3 {
          color: #000000 !important;
          margin-top: 24px !important;
          margin-bottom: 12px !important;
        }
        p {
          margin-bottom: 14px !important;
          color: #000000 !important;
        }
        strong {
          color: #000000 !important;
        }
      </style>

      ${html}
    </div>
  `;

  html2pdf()
    .from(container)
    .set({
      margin: 10,
      filename: "historia.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { 
        unit: "mm", 
        format: "a4", 
        orientation: "portrait"
      }
    })
    .save();
}
