import json

from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.views.decorators.http import  require_POST
from django.views.decorators.csrf import csrf_protect

from aws_bedrock_image_search.main import query_results, get_presigned_url

def home(request):
    return render(request, 'home.html')

@require_POST
@csrf_protect
def search(request):
    try:
        if request.method == 'POST':
            type = request.POST.get('type', '')
            data = request.POST.get('data', '')
            results = query_results(type, data)
            
            if len(results) >= 1:
                best_result = results[0]
                img_id = best_result[0]
                metadata = best_result[1]
                img_url = get_presigned_url('breed-finder-v1',img_id, 3600 )
                data = {
                    "img_url": img_url,
                    "breed": metadata.get('breed', '')
                }
                return HttpResponse(json.dumps(data),content_type="application/json")
            else:
                return HttpResponse("No results found.", status=404)
    except Exception as e:
        return HttpResponse(f"Invalid request method. Error = {str(e)}", status=405)