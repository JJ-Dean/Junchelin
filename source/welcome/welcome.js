//타이핑 효과
window.onload = function() {
	const content1 = "음식점 주변에서 느껴지는 \n음식의 냄새는 나를 뜨겁게 만든다. \n그리고 \n음식을 먹은 후의 나는 가장 \n\n";
	const text1 = document.querySelector("#text");
	let i = 0;
	
	function typing1(){
		
	    if (i < content1.length) {
	    let txt1 = content1.charAt(i);
	    text1.innerHTML += txt1 === "\n" ? "<br/>" : txt1;
	    i++;
	    }
	}
	setInterval(typing1, 120);
		}
	
	setTimeout(function() {
		const content2 = "뜨겁다";
	const text2 = document.querySelector("#text2");
	let j = 0;
	
	function typing2(){
		
	    if (j < content2.length) {
	    let txt2 = content2.charAt(j);
	    text2.innerHTML += txt2 === "\n" ? "<br/>" : txt2;
	    j++;
	    }
	}
	setInterval(typing2, 800);	
	},6600);