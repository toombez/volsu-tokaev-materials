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
\RequirePackage[outputdir=../output]{minted}
\RequirePackage{indentfirst}
\RequirePackage[
    compact,
]{titlesec}
\RequirePackage[
    left = 3cm,
    right = 1cm,
    top = 2cm,
    bottom = 2cm,
    bindingoffset = 0cm,
    includefoot,
    heightrounded,
]{geometry}

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
\captionsetup[table]{
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
\setlength{\parindent}{5ex}

\usemintedstyle{friendly}
\setminted{
    fontsize=\normalsize,
    xleftmargin=\parindent,
}
\setmintedinline{
    fontsize=\normalsize,
    xleftmargin=\parindent,
}

\titlespacing{\section}{\parindent}{*2}{\wordsep}
\titlespacing{\subsection}{\parindent}{*2}{\wordsep}
\titlespacing{\subsubsection}{\parindent}{*2}{\wordsep}

\makeatletter
\def\@maketitle{%
    \newpage
    \null\LARGE
    \vskip 0.5em
    \begin{center}
         \textbf{\MakeUppercase{\@title}}
    \end{center}
    \vskip 1em
}
\makeatother

\pagenumbering{arabic}
\linespread{1.3}
