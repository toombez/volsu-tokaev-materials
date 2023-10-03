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

\graphicspath{{images/}}

\addto\captionsenglish{\renewcommand{\figurename}{Рис.}}

\DeclareCaptionJustification{center}{\centering}

\captionsetup[figure]{
    justification=center,
    labelsep=endash,
    width=0.8\textwidth,
    skip=0.5em,
    font={
        it,
        rm,
        footnotesize,
        color=gray
    },
}

\setlength{\belowcaptionskip}{-0.5em}

\RequirePackage[outputdir=../output]{minted}
