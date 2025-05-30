\LoadClass[a4paper,12pt]{report}
\RequirePackage[left=2.5cm,right=2.5cm,top=2cm,bottom=3.5cm]{geometry}
\RequirePackage{fancyhdr}
\RequirePackage{wallpaper}
\RequirePackage{nomencl}
\RequirePackage[hidelinks]{hyperref}
\newcommand{\supervisors}[1]{\renewcommand{\supervisors}{#1}}
\newcommand{\students}[1]{\renewcommand{\students}{#1}}
\newcommand{\jury}[1]{\renewcommand{\jury}{#1}}
\newcommand{\makeheader}{
\makenomenclature
\pagestyle{fancy}
\fancyheadoffset{1cm}
\renewcommand{\footrulewidth}{0.4pt}
\setlength{\headheight}{2cm}
\lhead{
    \includegraphics[scale=0.04]{logo/ensias_triangle.png}
    \hspace{0.1cm} % Adjust the space as needed
    \includegraphics[scale=0.5]{}
    \hspace{0.1cm} % Adjust the space as needed
    \includegraphics[scale=0.12]{}
}

\rhead{\textbf{\nouppercase{\leftmark}}}
\rfoot{2023/2024}
\cfoot{\textbf{\thepage}}
\lfoot{ENSIAS}
}

\newcommand{\makecoverpage}{

\begin{titlepage}
\ThisLRCornerWallPaper{1}{logo/background.png}

    \centering
    
    \begin{minipage}{0.2\textwidth}
		\begin{flushleft} 
		\includegraphics[width=.95\textwidth]{logo/ensias.png}
		\end{flushleft}
	\end{minipage}
    ~
    \begin{minipage}{0.5\textwidth}
        \centering
		 % \textbf{\textcolor{cyan}{U}niversité \textcolor{cyan}{M}ohammed \textcolor{cyan}{V}}\\
        \textbf{\textcolor{red}{É}cole \textcolor{red}{N}ationale \textcolor{red}{S}upérieure d'\textcolor{red}{I}nformatique
et d'\textcolor{red}{A}nalyse des \textcolor{red}{S}ystèmes}\\
        \textbf{\textcolor{blue}{U}niversite \textcolor{blue}{M}ohammed
        \textcolor{blue}{V} } 
        %\textcolor{blue}{A}ero\textcolor{blue}{G}uard
	\end{minipage}
    ~
	\begin{minipage}{0.2\textwidth}
		\begin{flushright} 
        \includegraphics[width=1.2\textwidth]{logo/um5r.png}
		\end{flushright}
	\end{minipage}
     \begin{minipage}{0.2\textwidth}
		\begin{flushleft} 
            \vspace{0.5cm}
		\includegraphics[width=1.35\textwidth]{}
		\end{flushleft}
	\end{minipage}\\[4cm]
 
        \Large \textbf{Rapport PFA, filière : Genie Logiciel}


   
    \rule{\linewidth}{0.9 mm} \\
	{\Huge\bfseries Plateforme de Gestion des département ENSIAS
 \par} 
    \rule{\linewidth}{0.9 mm} \\
	\vspace{2cm}
    
	\begin{minipage}{0.5\textwidth}
		\begin{flushleft} \large 
		\emph{\textbf{Réalisé par:}}\\ 
        \students\\[1cm]
            \emph{\textbf{Encadré par:}}\\ 
        \supervisors\\[1cm]
		\end{flushleft}
	\end{minipage}
	~
	\begin{minipage}{0.4\textwidth}
		\begin{flushright}
            \vspace{1cm}
            \large\emph{\textbf{Jury:}} \\
		 \jury \\ [3cm]
             
             
		\end{flushright}
	\end{minipage}\\[2cm]
    
	% \vfill
	{\large 2024/2025 \par}

\end{titlepage}
}