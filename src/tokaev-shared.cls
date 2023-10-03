\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{tokaev-shared}[
    2023/10/01 Shared class
]

\LoadClass[]{article}

\RequirePackage{graphicx}
\RequirePackage[english,main=russian]{babel}
\RequirePackage[T2A]{fontenc}
\RequirePackage{caption}
\RequirePackage{xcolor}

\addto\captionsenglish{\renewcommand{\figurename}{Рис.}}

\DeclareCaptionJustification{center}{\centering}

\captionsetup[figure]{
    justification=center,
    labelsep=endash,
    width=0.8\textwidth,
    font={
        it,
        rm,
        footnotesize,
        color=gray
    },
}
