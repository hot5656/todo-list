let index = 1;
let jobs = [
	{
		job: 'New job',
		done: true,
		index: 1
	},
	{
		job: 'Pay bills',
		done: false,
		index: 2
	},	
]

for(i=0 ; i < jobs.length ; i++ ) {
	addJobItemToScreen(jobs[i])
	index = jobs[i].index
}
// save for add item index
index++

function addJobItemToScreen(job) {
	const itemList = document.querySelector('.item-list')
	let newItem = document.createElement('li')
	let checkString = ''
	newItem.classList.add('item')
 //  check done ?
	if (job.done) {
	 checkString = 'checked="checked"'
	 newItem.classList.add('done')
	}
	newItem.innerHTML = `
	 <label class='job' data-index=${job.index}>${job.job}
	 	<input class="input" type="checkbox" ${checkString}>
	 	<span class="checkmark"></span>
	 	<div class="notice ">完成</div>
	 </label>
	 <div class="button"></div>
	`
	//  add item
	itemList.append(newItem)
} 

// mouseover
document.querySelector('.item-list')
	.addEventListener('mouseover', function(e){
		const element = e.target
		if (element.classList.contains('checkmark')) {
			if 	(!element.parentElement.parentElement.classList.contains('done')) {
				element.parentElement.querySelector('.notice').classList.add('active')
			}
		}
	})
	document.querySelector('.item-list')
	.addEventListener('mouseout', function(e){
		const element = e.target
		if (element.classList.contains('checkmark')) {
			'remove', element.parentElement.querySelector('.notice').classList.remove('active')
		}
	})

// check toggle done
document.querySelector('.item-list')
	.addEventListener('click', function(e){
		const element = e.target
		// toogle checked
		// 檢查 .job 會有問題,有些地方會 checked 但不會觸發 .job
		if (element.classList.contains('input')) {
			const elementParent = element.parentElement.parentElement;
			// toggle class done
			elementParent.classList.toggle('done')
		}
		// check delete button
		if (element.classList.contains('button')) {
			const parentElement = element.parentElement
			const grandElement = parentElement.parentElement ;
			const index = Number(element.parentElement.querySelector('.job').getAttribute('data-index'))
			// remove HTML element
			grandElement.removeChild(parentElement)
			// remove array element
			for(let i=0 ; i< jobs.length ; i++) {
				if (jobs[i].index === index) {
					// 使用 delete array 會造成 length 不變, 原來的值變成 undefined
					// delete jobs[i]
					// splice 可真正將變數從 array 移除
					jobs.splice(i,1)
					break
				}
			}
			
			
		}
	})

// job input  
document.querySelector('.job-add input')
	.addEventListener('keyup', function(e){
		if (e.keyCode == 13) {
			const warnElement = document.querySelector('.warning')
			let job = {
				job: e.target.value,
				done: false
			}
			job.index = index++
			if (e.target.value === '') {
				if (!warnElement.classList.contains('active')) {
					warnElement.classList.add('active')
				}
			}
			else {
				jobs.push(job)
				addJobItemToScreen(job)
				e.target.value = ''
				if (warnElement.classList.contains('active')) {
					warnElement.classList.remove('active')
				}
			}
		}
	})
